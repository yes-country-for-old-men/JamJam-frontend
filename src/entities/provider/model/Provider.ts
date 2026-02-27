import type { User } from '@/entities/user/model/User';

export interface Education {
  id: number;
  school: string;
  major: string;
  degree: string;
}

export interface License {
  id: number;
  name: string;
}

export interface Career {
  id: number;
  company: string;
  position: string;
}

export interface Skill {
  id: number;
  name?: string;
}

export interface ContactHours {
  startHour: number;
  endHour: number;
}

export interface Provider extends User {
  categoryId: number;
  location: string;
  introduction: string;
  skills: Skill[];
  careers: Career[];
  educations: Education[];
  licenses: License[];
  contactHours: ContactHours;
  averageResponseTime: string;
}

export type ProviderProfile = Omit<
  Provider,
  'name' | 'phoneNumber' | 'loginId' | 'birth' | 'role' | 'gender'
>;
