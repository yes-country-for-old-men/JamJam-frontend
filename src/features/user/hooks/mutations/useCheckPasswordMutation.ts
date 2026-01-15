import { useMutation } from '@tanstack/react-query';
import {
  checkPassword,
  type CheckPasswordRequest,
} from '@/features/user/api/userApi';

const useCheckPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: CheckPasswordRequest) => checkPassword(data),
  });
};

export default useCheckPasswordMutation;
