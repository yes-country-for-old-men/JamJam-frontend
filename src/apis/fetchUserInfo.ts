import type User from '@type/User';
import apiClient from '@apis/apiClient';

const fetchUserInfo = async (): Promise<User> => {
  const response = await apiClient.get('/api/user');
  return response.data.content;
};

export default fetchUserInfo;
