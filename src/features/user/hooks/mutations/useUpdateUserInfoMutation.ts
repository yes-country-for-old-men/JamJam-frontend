import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateUserInfo,
  type UpdateUserRequest,
} from '@/features/user/api/userApi';

export const useUpdateUserInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => updateUserInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};
