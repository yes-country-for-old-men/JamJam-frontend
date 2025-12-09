import { useState, useCallback } from 'react';
import { storageService } from '@services/storage';

interface UseAuthTokenReturn {
  exists: boolean;
  get: () => string | null;
  set: (token: string) => void;
  remove: () => void;
}

export const useAuthToken = (): UseAuthTokenReturn => {
  const [token, setTokenState] = useState<string | null>(
    storageService.getAccessToken(),
  );

  const set = useCallback((newToken: string) => {
    storageService.setAccessToken(newToken);
    setTokenState(newToken);
  }, []);

  const remove = useCallback(() => {
    storageService.removeAccessToken();
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
