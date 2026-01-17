import { apiClient } from '@/shared/api/apiClient';
import type { ApiResponse } from '@/shared/types/ApiResponse';

export interface ServiceSearchRequest {
  keyword?: string;
  nickname?: string;
  page?: number;
  size?: number;
}

export type ServiceSearchItem = {
  serviceId: number;
  thumbnailUrl: string;
  serviceName: string;
  providerName: string;
  salary: number;
};

export type ServiceSearchContent = {
  services: ServiceSearchItem[];
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
};

export const searchServices = (params: ServiceSearchRequest) =>
  apiClient.get<ApiResponse<ServiceSearchContent>>('/api/search/service', {
    params,
  });
