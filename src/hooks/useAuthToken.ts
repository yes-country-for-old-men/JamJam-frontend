import { useState, useCallback } from 'react';

interface UseAuthTokenReturn {
  exists: boolean;
  get: () => string | null;
  set: (token: string) => void;
  remove: () => void;
}

export const useAuthToken = (): UseAuthTokenReturn => {
  const [token, setTokenState] = useState<string | null>(
    localStorage.getItem('accessToken'),
  );

  const set = useCallback((newToken: string) => {
    localStorage.setItem('accessToken', newToken);
    setTokenState(newToken);
  }, []);

  const remove = useCallback(() => {
    localStorage.removeItem('accessToken');
    setTokenState(null);
  }, []);

  const get = useCallback(() => token, [token]);

  return {
    exists: !!token,
    get,
    set,
    remove,
  };
};

export default useAuthToken;
