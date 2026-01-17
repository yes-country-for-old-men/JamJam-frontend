import { useAuthToken } from '@/features/auth/hooks/useAuthToken';
import { useUserInfoQuery } from '@/features/user/hooks/useUserInfoQuery';

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
