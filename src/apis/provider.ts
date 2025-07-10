import apiClient from '@apis/apiClient';
import type APIResponse from '@type/APIResponse';
import type {
  ProviderProfile,
  Skill,
  Career,
  Education,
  License,
  ContactHours,
} from '@type/Provider';

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
  apiClient.get<APIResponse<ProviderProfile>>('/api/providers');

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
  const formData = new FormData();

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

  const jsonBlob = new Blob([JSON.stringify(requestData)], {
    type: 'application/json',
  });
  formData.append('request', jsonBlob);

  data.careers.forEach((career) => {
    if (career.file) {
      formData.append('careerFiles', career.file);
    }
  });

  data.educations.forEach((education) => {
    if (education.file) {
      formData.append('educationFiles', education.file);
    }
  });

  data.licenses.forEach((license) => {
    if (license.file) {
      formData.append('licenseFiles', license.file);
    }
  });

  return formData;
};

export const registerProviderProfile = (data: ProviderRequestWithFiles) => {
  const formData = createProviderFormData(data);

  return apiClient.post('/api/providers', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateProviderProfile = (data: ProviderRequestWithFiles) => {
  const formData = createProviderFormData(data);

  return apiClient.patch('/api/providers', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getProviderPage = (userId: number) =>
  apiClient.get<APIResponse<ProviderDetailContent>>(
    `/api/providers/page/${userId}`,
  );
