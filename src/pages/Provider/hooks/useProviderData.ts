import { useState, useEffect } from 'react';
import { getProviderPage, type ProviderDetailContent } from '@apis/provider';

interface UseProviderDataReturn {
  data: ProviderDetailContent | null;
  loading: boolean;
  shouldRedirect: boolean;
}

const useProviderData = (userId: string | undefined): UseProviderDataReturn => {
  const [data, setData] = useState<ProviderDetailContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const fetchProviderData = async () => {
      if (!userId) {
        setShouldRedirect(true);
        return;
      }

      try {
        setLoading(true);
        const response = await getProviderPage(parseInt(userId, 10));

        if (response.data.code === 'SUCCESS') {
          setData(response.data.content);
        }
      } catch {
        setShouldRedirect(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProviderData();
  }, [userId]);

  return { data, loading, shouldRedirect };
};

export default useProviderData;
