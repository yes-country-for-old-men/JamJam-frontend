import { logout } from '@apis/auth';
import { storageService } from '@services/storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
