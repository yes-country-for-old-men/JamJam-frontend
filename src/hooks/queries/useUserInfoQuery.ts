import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import apiClient from '@apis/apiClient';
import type User from '@type/User';

const fetchUserInfo = async (): Promise<User> => {
  const response = await apiClient.get('/api/user');
  return response.data.content;
};

const useUserInfoQuery = () => {
  const hasToken = !!localStorage.getItem('accessToken');

  return useQuery<User, AxiosError>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    enabled: hasToken,
    staleTime: 5 * 60 * 1000,
  });
};

export default useUserInfoQuery;
