export const base64ToFile = (
  base64String: string,
  filename: string = 'thumbnail.png',
): File => {
  const base64Data = base64String.replace(/^data:image\/[a-z]+;base64,/, '');

  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i += 1) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  return new File([byteArray], filename, { type: 'image/png' });
};
