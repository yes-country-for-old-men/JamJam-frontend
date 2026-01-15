import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '@/features/auth/api/authApi';
import { storageService } from '@/shared/services/storage';

const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      storageService.removeAccessToken();
      queryClient.clear();
      window.location.reload();
    },
  });
};

export default useLogoutMutation;
