import { apiClient } from '@/shared/api/apiClient';
import { createMultipartRequest } from '@/shared/lib';
import type { ApiResponse } from '@/shared/types/ApiResponse';

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

export interface ServiceUpdateRequest {
  serviceId: number;
  request: {
    serviceName: string;
    description: string;
    salary: number;
    categoryId: number;
    deleteImageIds?: number[];
  };
  thumbnail?: File;
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

  return apiClient.post<ApiResponse<void>>('/api/service/register', formData, {
    headers,
  });
};

export const generateService = (data: ServiceGenerateRequest) =>
  apiClient.post<ApiResponse<ServiceGenerateContent>>(
    '/api/service/generate',
    data,
  );

export const generateAiThumbnail = (data: AiThumbnailRequest) =>
  apiClient.post<ApiResponse<AiThumbnailContent>>(
    '/api/service/ai-thumbnail',
    data,
  );

export const getServiceDetail = (params: ServiceDetailRequest) =>
  apiClient.get<ApiResponse<ServiceDetailContent>>('/api/service/detail', {
    params,
  });

export const deleteService = (params: ServiceDeleteRequest) =>
  apiClient.delete<ApiResponse<void>>('/api/service/delete', {
    params,
  });

export const updateService = (data: ServiceUpdateRequest) => {
  const { data: formData, headers } = createMultipartRequest(data.request, {
    thumbnail: data.thumbnail,
    portfolioImages: data.portfolioImages,
  });

  return apiClient.patch<ApiResponse<void>>(
    `/api/service/edit?serviceId=${data.serviceId}`,
    formData,
    { headers },
  );
};

export const getServiceList = (params: ServiceListRequest) =>
  apiClient.get<ApiResponse<ServiceListContent>>('/api/service/service-list', {
    params,
  });

interface ServiceInquiryRequest {
  serviceId: number;
}

export const inquireService = (params: ServiceInquiryRequest) =>
  apiClient.post<ApiResponse<void>>('/api/service/inquiry', null, { params });
