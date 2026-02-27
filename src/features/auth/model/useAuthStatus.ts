import { useUserInfoQuery } from '@/entities/user/model/useUserInfoQuery';
import { useAuthToken } from '@/features/auth/model/useAuthToken';

interface UseAuthStatusReturn {
  isLoggedIn: boolean;
  isProvider: boolean;
  userInfo: ReturnType<typeof useUserInfoQuery>['data'];
  isLoading: boolean;
  isError: boolean;
}

export const useAuthStatus = (): UseAuthStatusReturn => {
  const { exists: hasToken } = useAuthToken();
  const { data: userInfo, isLoading, isError } = useUserInfoQuery();

  const isLoggedIn = hasToken && !!userInfo && !isError;
  const isProvider = userInfo?.role === 'PROVIDER';

  return {
    isLoggedIn,
    isProvider,
    userInfo,
    isLoading,
    isError,
  };
};
