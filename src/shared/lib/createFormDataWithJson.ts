export const createFormDataWithJson = <T extends Record<string, unknown>>(
  request: T,
  files?: Record<string, File | File[] | undefined>,
): FormData => {
  const formData = new FormData();

  const jsonBlob = new Blob([JSON.stringify(request)], {
    type: 'application/json',
  });
  formData.append('request', jsonBlob);

  if (files) {
    Object.entries(files).forEach(([key, value]) => {
      if (!value) return;

      if (Array.isArray(value)) {
        value.forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, value);
      }
    });
  }

  return formData;
};
