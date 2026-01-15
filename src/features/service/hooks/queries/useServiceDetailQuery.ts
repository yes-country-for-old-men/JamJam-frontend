import { useQuery } from '@tanstack/react-query';
import { getServiceDetail } from '@/features/service/api/serviceApi';

const useServiceDetailQuery = (serviceId: number | null) => {
  return useQuery({
    queryKey: ['serviceDetail', serviceId],
    queryFn: () => getServiceDetail({ serviceId: serviceId! }),
    enabled: !!serviceId,
    staleTime: 10 * 60 * 1000,
  });
};

export default useServiceDetailQuery;
