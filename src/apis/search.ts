import apiClient from '@apis/apiClient';
import type APIResponse from '@type/APIResponse';

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
  apiClient.get<APIResponse<ServiceSearchContent>>('/api/search/service', {
    params,
  });
