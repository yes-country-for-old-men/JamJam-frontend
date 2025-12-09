import { updateUserInfo, type UpdateUserRequest } from '@apis/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateUserInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => updateUserInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};

export default useUpdateUserInfoMutation;
