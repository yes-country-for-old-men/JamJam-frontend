import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@apis/apiClient';

const userLogout = async () => {
  const response = await apiClient.post('/api/user/logout', null, {
    withCredentials: true,
  });
  return response.data;
};

const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      queryClient.clear();
    },
  });
};

export default useLogoutMutation;
