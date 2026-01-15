import apiClient from '@/shared/api/apiClient';
import { createMultipartRequest } from '@/shared/utils';
import type User from '@/features/user/types/User';
import type ApiResponse from '@/shared/types/ApiResponse';

export interface UpdateUserRequest {
  request: {
    nickname?: string;
    phoneNumber?: string;
    password?: string;
    account?: {
      bankCode: string;
      bankName: string;
      accountNumber: string;
      depositor: string;
    };
    deleteProfileImage?: boolean;
  };
  profileUrl?: File;
}

export interface CheckPasswordRequest {
  password: string;
}

interface CheckPasswordContent {
  isCorrect: boolean;
}

export const getUserInfo = async (): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>('/api/user');
  return response.data.content;
};

export const updateUserInfo = (data: UpdateUserRequest) => {
  const { data: formData, headers } = createMultipartRequest(data.request, {
    profileUrl: data.profileUrl,
  });

  return apiClient.patch<ApiResponse<User>>('/api/user', formData, { headers });
};

export const checkPassword = (data: CheckPasswordRequest) =>
  apiClient.post<ApiResponse<CheckPasswordContent>>(
    '/api/user/check-password',
    data,
  );
