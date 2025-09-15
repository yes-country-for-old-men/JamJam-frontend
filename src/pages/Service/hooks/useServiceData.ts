import { useState, useEffect } from 'react';
import { getServiceDetail, type ServiceDetailContent } from '@apis/service';

interface UseServiceDataReturn {
  data: ServiceDetailContent | null;
  loading: boolean;
  shouldRedirect: boolean;
}

const useServiceData = (
  serviceId: string | undefined,
): UseServiceDataReturn => {
  const [data, setData] = useState<ServiceDetailContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      if (!serviceId) {
        setShouldRedirect(true);
        return;
      }

      try {
        setLoading(true);
        const response = await getServiceDetail({
          serviceId: parseInt(serviceId, 10),
        });

        if (response.data.code === 'SUCCESS') {
          setData(response.data.content);
        }
      } catch {
        setShouldRedirect(true);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetail();
  }, [serviceId]);

  return { data, loading, shouldRedirect };
};

export default useServiceData;
