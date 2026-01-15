import { useForm, type UseFormReturn } from 'react-hook-form';
import type {
  ProviderProfile,
  Career,
  Education,
  License,
} from '@/features/provider/types/Provider';
import type FileWithId from '@/shared/types/FileWithId';

interface ProfileFormData
  extends Omit<
    ProviderProfile,
    | 'location'
    | 'categoryId'
    | 'averageResponseTime'
    | 'careers'
    | 'educations'
    | 'licenses'
  > {
  selectedLocation: number | null;
  selectedCategory: number | null;
  careers: (Career & { documents: FileWithId[] })[];
  educations: (Education & { documents: FileWithId[] })[];
  licenses: (License & { documents: FileWithId[] })[];
}

export type ProfileForm = UseFormReturn<ProfileFormData>;

const useProfileForm = () => {
  const form = useForm<ProfileFormData>({
    defaultValues: {
      introduction: '',
      selectedLocation: null,
      selectedCategory: null,
      contactHours: { startHour: 0, endHour: 24 },
      skills: [],
      careers: [],
      educations: [],
      licenses: [],
    },
  });

  return { form };
};

export default useProfileForm;
