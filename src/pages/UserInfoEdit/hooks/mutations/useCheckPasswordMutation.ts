import { checkPassword, type CheckPasswordRequest } from '@apis/user';
import { useMutation } from '@tanstack/react-query';

const useCheckPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: CheckPasswordRequest) => checkPassword(data),
  });
};

export default useCheckPasswordMutation;
