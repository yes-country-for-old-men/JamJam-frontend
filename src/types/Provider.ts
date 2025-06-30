import type User from '@type/User';

export interface Provider extends User {
  categoryId: number;
  location: string;
  introduction: string;
  contactHours: string;
  averageResponseTime: string;
  skills: string[];
  careers: string[];
  educations: string[];
  licenses: string[];
}

export type ProviderProfile = Omit<
  Provider,
  'name' | 'phoneNumber' | 'loginId' | 'birth' | 'role' | 'gender'
>;
