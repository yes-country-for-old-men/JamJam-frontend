import { createFormDataWithJson } from '@utils';

interface MultipartRequestConfig {
  data: FormData;
  headers: {
    'Content-Type': 'multipart/form-data';
  };
}

export const createMultipartRequest = <T extends Record<string, unknown>>(
  data: T,
  files?: Record<string, File | File[] | undefined>,
): MultipartRequestConfig => {
  const formData = createFormDataWithJson(data, files);
  return {
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  };
};

export default createMultipartRequest;
