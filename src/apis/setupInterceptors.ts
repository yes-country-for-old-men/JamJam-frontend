import {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { storageService } from '@services/storage';
import { eventManager } from '@utils';

interface TokenRefreshQueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

interface ApiErrorResponse {
  code?: string;
  message?: string;
}

const AUTH_ERROR_CODE = {
  ACCESS_TOKEN_EXPIRED: ['ACCESS_INVALID', 'ACCESS_EXPIRED'],
  REFRESH_TOKEN_EXPIRED: ['REFRESH_INVALID', 'REFRESH_EXPIRED'],
} as const;

let isRefreshingToken = false;
let tokenRefreshQueue: TokenRefreshQueueItem[] = [];
const retriedRequests = new WeakSet<InternalAxiosRequestConfig>();

const processTokenRefreshQueue = (
  error: AxiosError | null,
  token: string | null = null,
): void => {
  tokenRefreshQueue.forEach((item) => {
    if (error) {
      item.reject(error);
    } else {
      item.resolve(token);
    }
  });
  tokenRefreshQueue = [];
};

const isAccessTokenExpired = (errorCode?: string): boolean => {
  return AUTH_ERROR_CODE.ACCESS_TOKEN_EXPIRED.includes(errorCode as never);
};

const isRefreshTokenExpired = (errorCode?: string): boolean => {
  return AUTH_ERROR_CODE.REFRESH_TOKEN_EXPIRED.includes(errorCode as never);
};

const showLoginModal = (): void => {
  eventManager.emit('openLoginModal');
};

const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken = storageService.getAccessToken();
      const updatedConfig = { ...config };
      if (accessToken && updatedConfig.headers) {
        updatedConfig.headers.Authorization = `Bearer ${accessToken}`;
      }
      return updatedConfig;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig;
      const responseData = error.response?.data as ApiErrorResponse;
      const { code: errorCode } = responseData || {};

      if (originalRequest.url === '/api/user/reissue') {
        if (
          isAccessTokenExpired(errorCode) ||
          isRefreshTokenExpired(errorCode) ||
          error.response?.status === 403
        ) {
          storageService.removeAccessToken();
          showLoginModal();
        }
        return Promise.reject(error);
      }

      if (isAccessTokenExpired(errorCode)) {
        if (retriedRequests.has(originalRequest)) {
          return Promise.reject(error);
        }

        if (isRefreshingToken) {
          return new Promise((resolve, reject) => {
            tokenRefreshQueue.push({ resolve, reject });
          })
            .then(() => {
              const accessToken = storageService.getAccessToken();
              if (originalRequest?.headers && accessToken) {
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              }
              return instance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        retriedRequests.add(originalRequest);
        isRefreshingToken = true;

        try {
          const refreshResponse = await instance.post(
            '/api/user/reissue',
            null,
            {
              withCredentials: true,
            },
          );
          const newAccessToken = refreshResponse.data.content.accessToken;

          storageService.setAccessToken(newAccessToken);

          if (originalRequest?.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          processTokenRefreshQueue(null, newAccessToken);
          isRefreshingToken = false;

          return await instance(originalRequest);
        } catch (refreshError) {
          processTokenRefreshQueue(refreshError as AxiosError, null);
          isRefreshingToken = false;
          storageService.removeAccessToken();
          showLoginModal();
          return Promise.reject(refreshError);
        }
      }

      if (isRefreshTokenExpired(errorCode)) {
        storageService.removeAccessToken();
        showLoginModal();
      }

      return Promise.reject(error);
    },
  );
};

export default setupInterceptors;
