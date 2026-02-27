import type { FileWithId } from '@/shared/types/FileWithId';

export interface OrderFormData {
  title: string;
  deadline: {
    year: string;
    month: string;
    day: string;
  };
  content: string;
  files: FileWithId[];
}

export interface DeadlineData {
  year: string;
  month: string;
  day: string;
}
