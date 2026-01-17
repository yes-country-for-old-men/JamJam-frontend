import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getUserInfo } from '@/features/user/api/userApi';
import type { User } from '@/features/user/types/User';

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
