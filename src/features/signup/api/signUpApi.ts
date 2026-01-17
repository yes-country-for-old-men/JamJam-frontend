import { apiClient } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/types/ApiResponse';

type CheckContent = {
  available: boolean;
};

export interface SMSSendRequest {
  phoneNumber: string;
}

export interface SMSVerifyRequest {
  phoneNumber: string;
  code: string;
}

export interface SignUpRequest {
  name: string;
  nickname: string;
  loginId: string;
  phoneNumber: string;
  password: string;
  birth: string;
  gender: 'MALE' | 'FEMALE';
}

export const checkNickname = (nickname: string) =>
  apiClient.get<ApiResponse<CheckContent>>('/api/user/check/nickname', {
    params: { nickname },
  });

export const checkLoginId = (loginId: string) =>
  apiClient.get<ApiResponse<CheckContent>>('/api/user/check/loginId', {
    params: { loginId },
  });

export const sendSMS = (data: SMSSendRequest) =>
  apiClient.post('/api/user/sms/send', data);

export const verifySMS = (data: SMSVerifyRequest) =>
  apiClient.post('/api/user/sms/verify', data);

export const clientSignUp = (data: SignUpRequest) =>
  apiClient.post('/api/user/join/client', data);

export const providerSignUp = (data: SignUpRequest) =>
  apiClient.post('/api/user/join/provider', data);
