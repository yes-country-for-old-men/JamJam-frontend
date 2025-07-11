import apiClient from '@apis/apiClient';
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

export interface ServiceGenerateRequest {
  description: string;
}

export interface ServiceDetailRequest {
  serviceId: number;
}

export interface ServiceDeleteRequest {
  serviceId: number;
}

type ServiceGenerateContent = {
  serviceNames: string[];
  category: number;
  description: string;
};

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

export interface AiThumbnailRequest {
  serviceName: string;
  description: string;
  typography: boolean;
}

type AiThumbnailContent = {
  imageBase64: string;
};

export const registerService = (data: ServiceRegisterRequest) => {
  const formData = new FormData();

  const jsonBlob = new Blob([JSON.stringify(data.request)], {
    type: 'application/json',
  });
  formData.append('request', jsonBlob);

  formData.append('thumbnail', data.thumbnail);

  data.portfolioImages?.forEach((image) => {
    formData.append('portfolioImages', image);
  });

  return apiClient.post('/api/service/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
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
  apiClient.delete('/api/service/delete', {
    params,
  });
