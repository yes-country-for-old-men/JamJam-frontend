import { getUserInfo } from '@apis/user';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type User from '@type/User';

const useUserInfoQuery = () => {
  const hasToken = !!localStorage.getItem('accessToken');

  return useQuery<User, AxiosError>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: hasToken,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export default useUserInfoQuery;
