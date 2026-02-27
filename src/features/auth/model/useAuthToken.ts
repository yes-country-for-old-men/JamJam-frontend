import { useState } from 'react';
import { storageService } from '@/shared/lib/storage';

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

  const set = (newToken: string) => {
    storageService.setAccessToken(newToken);
    setTokenState(newToken);
  };

  const remove = () => {
    storageService.removeAccessToken();
    setTokenState(null);
  };

  const get = () => token;

  return {
    exists: !!token,
    get,
    set,
    remove,
  };
};
