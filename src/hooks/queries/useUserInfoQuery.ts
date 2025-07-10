import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type User from '@type/User';
import { fetchUserInfo } from '@apis/user';

const useUserInfoQuery = () => {
  const hasToken = !!localStorage.getItem('accessToken');

  return useQuery<User, AxiosError>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    enabled: hasToken,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export default useUserInfoQuery;
