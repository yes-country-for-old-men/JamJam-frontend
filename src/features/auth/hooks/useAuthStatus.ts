import useAuthToken from '@/features/auth/hooks/useAuthToken';
import useUserInfoQuery from '@/features/user/hooks/useUserInfoQuery';
import { isProvider as isProviderRole } from '@/shared/utils';

interface UseAuthStatusReturn {
  isLoggedIn: boolean;
  isProvider: boolean;
  userInfo: ReturnType<typeof useUserInfoQuery>['data'];
  isLoading: boolean;
  isError: boolean;
}

const useAuthStatus = (): UseAuthStatusReturn => {
  const { exists: hasToken } = useAuthToken();
  const { data: userInfo, isLoading, isError } = useUserInfoQuery();

  const isLoggedIn = hasToken && !!userInfo && !isError;
  const isProvider = userInfo?.role ? isProviderRole(userInfo.role) : false;

  return {
    isLoggedIn,
    isProvider,
    userInfo,
    isLoading,
    isError,
  };
};

export default useAuthStatus;
