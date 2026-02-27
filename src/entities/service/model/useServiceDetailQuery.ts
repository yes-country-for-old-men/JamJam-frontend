import { useQuery } from '@tanstack/react-query';
import { getServiceDetail } from '@/entities/service/api/serviceApi';

export const useServiceDetailQuery = (serviceId: number | null) => {
  return useQuery({
    queryKey: ['serviceDetail', serviceId],
    queryFn: () => getServiceDetail({ serviceId: serviceId! }),
    enabled: !!serviceId,
    staleTime: 10 * 60 * 1000,
  });
};
