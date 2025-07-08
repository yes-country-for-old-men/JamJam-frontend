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

export interface SkillWithDocument extends Skill {
  document?: File;
}

export interface CareerWithDocument extends Career {
  document?: File;
}

export interface EducationWithDocument extends Education {
  document?: File;
}

export interface LicenseWithDocument extends License {
  document?: File;
}

export interface ProviderRequestWithDocuments {
  categoryId: number;
  location: string;
  introduction: string;
  contactHours: ContactHours;
  averageResponseTime: string;
  skills: SkillWithDocument[];
  careers: CareerWithDocument[];
  educations: EducationWithDocument[];
  licenses: LicenseWithDocument[];
}

export const getProviderProfile = () =>
  apiClient.get<APIResponse<ProviderProfile>>('/api/providers');

const createProviderFormData = (data: ProviderRequestWithDocuments) => {
  const formData = new FormData();

  const requestData = {
    categoryId: data.categoryId,
    location: data.location,
    introduction: data.introduction,
    contactHours: data.contactHours,
    averageResponseTime: data.averageResponseTime,
    skills: data.skills.map(({ document, ...skill }) => skill),
    careers: data.careers.map(({ document, ...career }) => career),
    educations: data.educations.map(({ document, ...education }) => education),
    licenses: data.licenses.map(({ document, ...license }) => license),
  };

  formData.append('request', JSON.stringify(requestData));

  data.skills.forEach((skill) => {
    if (skill.document) {
      formData.append('skillDocuments', skill.document);
    }
  });

  data.careers.forEach((career) => {
    if (career.document) {
      formData.append('careerDocuments', career.document);
    }
  });

  data.educations.forEach((education) => {
    if (education.document) {
      formData.append('educationDocuments', education.document);
    }
  });

  data.licenses.forEach((license) => {
    if (license.document) {
      formData.append('licenseDocuments', license.document);
    }
  });

  return formData;
};

export const registerProviderProfile = (data: ProviderRequestWithDocuments) => {
  const formData = createProviderFormData(data);

  return apiClient.post('/api/providers', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateProviderProfile = (data: ProviderRequestWithDocuments) => {
  const formData = createProviderFormData(data);

  return apiClient.patch('/api/providers', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
