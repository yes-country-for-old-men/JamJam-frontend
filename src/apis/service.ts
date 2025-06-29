import apiClient from '@apis/apiClient';

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
  skills: string;
  career: string;
}

export interface ServiceGenerateResponse {
  content: {
    serviceNames: string[];
    categoryId: number;
    description: string;
  };
}

export interface AiThumbnailRequest {
  serviceName: string;
  description: string;
  typography: boolean;
}

export interface AiThumbnailResponse {
  content: {
    imageBase64: string;
  };
}

export const registerService = (data: ServiceRegisterRequest) => {
  const formData = new FormData();

  formData.append('request', JSON.stringify(data.request));

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
  apiClient.post<ServiceGenerateResponse>('/api/service/generate', data);

export const generateAiThumbnail = (data: AiThumbnailRequest) =>
  apiClient.post<AiThumbnailResponse>('/api/service/ai-thumbnail', data);
