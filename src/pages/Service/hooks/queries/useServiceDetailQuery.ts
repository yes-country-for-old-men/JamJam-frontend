import { useQuery } from '@tanstack/react-query';
import { getServiceDetail } from '@apis/service';

const useServiceDetailQuery = (serviceId: number | null) => {
  return useQuery({
    queryKey: ['serviceDetail', serviceId],
    queryFn: () => getServiceDetail({ serviceId: serviceId! }),
    enabled: !!serviceId,
    staleTime: 10 * 60 * 1000,
  });
};

export default useServiceDetailQuery;
