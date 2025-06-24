import apiClient from '@apis/apiClient';

const userLogout = async () => {
  const response = await apiClient.post('/api/user/logout', null, {
    withCredentials: true,
  });
  return response.data;
};

export default userLogout;
