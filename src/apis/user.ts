import apiClient from '@apis/apiClient';
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

export const fetchUserInfo = async (): Promise<User> => {
  const response = await apiClient.get<APIResponse<User>>('/api/user');
  return response.data.content;
};

export const updateUserInfo = (data: UpdateUserRequest) => {
  const formData = new FormData();

  const jsonBlob = new Blob([JSON.stringify(data.request)], {
    type: 'application/json',
  });
  formData.append('request', jsonBlob);

  if (data.profileUrl) {
    formData.append('profileUrl', data.profileUrl);
  }

  return apiClient.patch('/api/user', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const checkPassword = (data: CheckPasswordRequest) =>
  apiClient.post<APIResponse<CheckPasswordContent>>(
    '/api/user/check-password',
    data,
  );
