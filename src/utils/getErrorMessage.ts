import { AxiosError } from 'axios';
import type { ApiError } from '@type/ApiError';
import ensurePunctuation from '@utils/ensurePunctuation';

const getErrorMessage = (error: ApiError | unknown): string => {
  if (error instanceof AxiosError && error.response?.data.message) {
    return ensurePunctuation(error.response?.data.message);
  }

  return '알 수 없는 오류가 발생했습니다.';
};

export default getErrorMessage;
