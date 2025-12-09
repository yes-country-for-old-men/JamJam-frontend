import apiClient from '@apis/apiClient';
import createMultipartRequest from '@utils/multipartRequest';
import type APIResponse from '@type/APIResponse';
import type User from '@type/User';

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
  const response = await apiClient.get<APIResponse<User>>('/api/user');
  return response.data.content;
};

export const updateUserInfo = (data: UpdateUserRequest) => {
  const { data: formData, headers } = createMultipartRequest(data.request, {
    profileUrl: data.profileUrl,
  });

  return apiClient.patch<APIResponse<User>>('/api/user', formData, { headers });
};

export const checkPassword = (data: CheckPasswordRequest) =>
  apiClient.post<APIResponse<CheckPasswordContent>>(
    '/api/user/check-password',
    data,
  );
