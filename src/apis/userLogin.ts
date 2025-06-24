import apiClient from '@apis/apiClient';

interface LoginRequest {
  loginId: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

const userLogin = async ({
  loginId,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post(
    '/api/user/login',
    { loginId, password },
    { withCredentials: true },
  );
  return response.data;
};

export default userLogin;
