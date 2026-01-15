import apiClient from '@/shared/api/apiClient';
import { createMultipartRequest } from '@/shared/utils';
import type {
  ProviderProfile,
  Skill,
  Career,
  Education,
  License,
  ContactHours,
} from '@/features/provider/types/Provider';
import type ApiResponse from '@/shared/types/ApiResponse';

export interface CareerWithFile extends Career {
  file?: File;
}

export interface EducationWithFile extends Education {
  file?: File;
}

export interface LicenseWithFile extends License {
  file?: File;
}

export interface ProviderRequestWithFiles {
  categoryId: number;
  location: string;
  introduction: string;
  contactHours: ContactHours;
  skills: Skill[];
  careers: CareerWithFile[];
  educations: EducationWithFile[];
  licenses: LicenseWithFile[];
}

export const getProviderProfile = () =>
  apiClient.get<ApiResponse<ProviderProfile>>('/api/providers');

export type ProviderDetailContent = ProviderProfile & {
  profileUrl: string;
  nickname: string;
  services: Array<{
    serviceId: number;
    thumbnailUrl: string;
    serviceName: string;
    providerName: string;
    salary: number;
  }>;
};

const createProviderFormData = (data: ProviderRequestWithFiles) => {
  const requestData = {
    categoryId: data.categoryId,
    location: data.location,
    introduction: data.introduction,
    contactHours: data.contactHours,
    skills: data.skills,
    careers: data.careers.map(({ file, ...career }) => career),
    educations: data.educations.map(({ file, ...education }) => education),
    licenses: data.licenses.map(({ file, ...license }) => license),
  };

  const careerFiles = data.careers
    .map((career) => career.file)
    .filter((file): file is File => file !== undefined);

  const educationFiles = data.educations
    .map((education) => education.file)
    .filter((file): file is File => file !== undefined);

  const licenseFiles = data.licenses
    .map((license) => license.file)
    .filter((file): file is File => file !== undefined);

  return createMultipartRequest(requestData, {
    careerFiles,
    educationFiles,
    licenseFiles,
  });
};

export const registerProviderProfile = (data: ProviderRequestWithFiles) => {
  const { data: formData, headers } = createProviderFormData(data);

  return apiClient.post<ApiResponse<ProviderProfile>>(
    '/api/providers',
    formData,
    { headers },
  );
};

export const updateProviderProfile = (data: ProviderRequestWithFiles) => {
  const { data: formData, headers } = createProviderFormData(data);

  return apiClient.patch<ApiResponse<ProviderProfile>>(
    '/api/providers',
    formData,
    { headers },
  );
};

export const getProviderPage = (userId: number) =>
  apiClient.get<ApiResponse<ProviderDetailContent>>(
    `/api/providers/page/${userId}`,
  );
