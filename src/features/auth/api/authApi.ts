import { apiClient } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/types/ApiResponse';

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
