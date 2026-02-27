import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getUserInfo } from '@/entities/user/api/userApi';
import type { User } from '@/entities/user/model/User';

export const useUserInfoQuery = () => {
  const hasToken = !!localStorage.getItem('accessToken');

  return useQuery<User, AxiosError>({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: hasToken,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
