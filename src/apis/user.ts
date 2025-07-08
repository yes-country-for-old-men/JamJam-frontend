import apiClient from '@apis/apiClient';
import type APIResponse from '@type/APIResponse';
import type User from '@type/User';

const fetchUserInfo = async (): Promise<User> => {
  const response = await apiClient.get<APIResponse<User>>('/api/user');
  return response.data.content;
};

export default fetchUserInfo;
