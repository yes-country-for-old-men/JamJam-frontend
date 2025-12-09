import { logout } from '@apis/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      queryClient.clear();
      window.location.reload();
    },
  });
};

export default useLogoutMutation;
