import { useMutation, useQueryClient } from '@tanstack/react-query';
import userLogout from '@apis/userLogout';

const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      queryClient.clear();
      window.location.reload();
    },
  });
};

export default useLogoutMutation;
