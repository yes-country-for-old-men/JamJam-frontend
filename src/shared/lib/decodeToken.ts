export const decodeToken = (token: string): { userId: string } | null => {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    const { userId } = decoded;
    return { userId: userId?.toString() };
  } catch {
    return null;
  }
};
