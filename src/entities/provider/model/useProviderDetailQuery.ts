import { useQuery } from '@tanstack/react-query';
import { getProviderPage } from '@/entities/provider/api/providerApi';

export const useProviderDetailQuery = (userId: number | null) => {
  return useQuery({
    queryKey: ['providerDetail', userId],
    queryFn: () => getProviderPage(userId!),
    enabled: !!userId,
    staleTime: 10 * 60 * 1000,
  });
};
