import apiClient from '@apis/apiClient';
import type APIResponse from '@type/APIResponse';

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export const login = async ({
  loginId,
  password,
}: LoginRequest): Promise<APIResponse<LoginResponse>> => {
  const response = await apiClient.post<APIResponse<LoginResponse>>(
    '/api/user/login',
    { loginId, password },
    { withCredentials: true },
  );
  return response.data;
};

export const logout = async (): Promise<APIResponse<void>> => {
  const response = await apiClient.post<APIResponse<void>>(
    '/api/user/logout',
    null,
    { withCredentials: true },
  );
  return response.data;
};
