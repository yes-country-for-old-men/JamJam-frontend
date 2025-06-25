import { AxiosError } from 'axios';
import ensurePunctuation from '@utils/ensurePunctuation';

interface ApiErrorResponse {
  message?: string;
}

const getErrorMessage = (
  error: AxiosError<ApiErrorResponse> | unknown,
): string => {
  if (error instanceof AxiosError && error.response?.data.message) {
    return ensurePunctuation(error.response?.data.message);
  }

  return '알 수 없는 오류가 발생했습니다.';
};

export default getErrorMessage;
