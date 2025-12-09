import apiClient from '@apis/apiClient';
import createMultipartRequest from '@utils/multipartRequest';
import type APIResponse from '@type/APIResponse';

export interface ServiceRegisterRequest {
  request: {
    serviceName: string;
    categoryId: number;
    salary: number;
    description: string;
  };
  thumbnail: File;
  portfolioImages?: File[];
}

interface ServiceGenerateRequest {
  description: string;
}

interface ServiceDetailRequest {
  serviceId: number;
}

interface ServiceDeleteRequest {
  serviceId: number;
}

export interface ServiceListRequest {
  category?: number;
  providerId?: number;
  page?: number;
  size?: number;
}

interface ServiceGenerateContent {
  serviceNames: string[];
  category: number;
  description: string;
}

export type ServiceDetailContent = {
  userId: number;
  nickName: string;
  profileUrl: string;
  location: string;
  serviceId: number;
  thumbnail: string;
  portfolioImages: { id: number; url: string }[];
  serviceName: string;
  description: string;
  salary: number;
  category: number;
};

export type ServiceListItem = {
  serviceId: number;
  thumbnailUrl: string;
  serviceName: string;
  providerName: string;
  salary: number;
};

export type ServiceListContent = {
  services: ServiceListItem[];
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
};

interface AiThumbnailRequest {
  serviceName: string;
  description: string;
  typography: boolean;
}

interface AiThumbnailContent {
  imageBase64: string;
}

export const registerService = (data: ServiceRegisterRequest) => {
  const { data: formData, headers } = createMultipartRequest(data.request, {
    thumbnail: data.thumbnail,
    portfolioImages: data.portfolioImages,
  });

  return apiClient.post<APIResponse<void>>('/api/service/register', formData, {
    headers,
  });
};

export const generateService = (data: ServiceGenerateRequest) =>
  apiClient.post<APIResponse<ServiceGenerateContent>>(
    '/api/service/generate',
    data,
  );

export const generateAiThumbnail = (data: AiThumbnailRequest) =>
  apiClient.post<APIResponse<AiThumbnailContent>>(
    '/api/service/ai-thumbnail',
    data,
  );

export const getServiceDetail = (params: ServiceDetailRequest) =>
  apiClient.get<APIResponse<ServiceDetailContent>>('/api/service/detail', {
    params,
  });

export const deleteService = (params: ServiceDeleteRequest) =>
  apiClient.delete<APIResponse<void>>('/api/service/delete', {
    params,
  });

export const getServiceList = (params: ServiceListRequest) =>
  apiClient.get<APIResponse<ServiceListContent>>('/api/service/service-list', {
    params,
  });
