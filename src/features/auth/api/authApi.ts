import { apiClient } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/types/ApiResponse';

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface SearchLoginIdRequest {
  name: string;
  birth: string;
  phoneNumber: string;
}

export interface SearchLoginIdResponse {
  loginId: string;
}

export interface ResetPasswordRequest {
  loginId: string;
  name: string;
  birth: string;
  phoneNumber: string;
}

export const login = async ({
  loginId,
  password,
}: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    '/api/user/login',
    { loginId, password },
    { withCredentials: true },
  );
  return response.data;
};

export const logout = async (): Promise<ApiResponse<void>> => {
  const response = await apiClient.post<ApiResponse<void>>(
    '/api/user/logout',
    null,
    { withCredentials: true },
  );
  return response.data;
};

export const searchLoginId = async (
  data: SearchLoginIdRequest,
): Promise<ApiResponse<SearchLoginIdResponse>> => {
  const response = await apiClient.post<ApiResponse<SearchLoginIdResponse>>(
    '/api/user/search-login-id',
    data,
  );
  return response.data;
};

export const resetPassword = async (
  data: ResetPasswordRequest,
): Promise<ApiResponse<object>> => {
  const response = await apiClient.post<ApiResponse<object>>(
    '/api/user/reset-password',
    data,
  );
  return response.data;
};
