import { useMutation } from '@tanstack/react-query';
import {
  checkPassword,
  type CheckPasswordRequest,
} from '@/entities/user/api/userApi';

export const useCheckPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: CheckPasswordRequest) => checkPassword(data),
  });
};
