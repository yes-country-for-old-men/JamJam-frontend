import React, { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import {
  getProviderProfile,
  updateProviderProfile,
  registerProviderProfile,
  type ProviderRequestWithFiles,
} from '@/entities/provider/api/providerApi';
import { useProfileForm } from '@/features/provider/model/useProfileForm';
import CareerSection from '@/features/provider/ui/ProfileEdit/CareerSection';
import ContactTimeSection from '@/features/provider/ui/ProfileEdit/ContactTimeSection';
import EducationSection from '@/features/provider/ui/ProfileEdit/EducationSection';
import ExpertIntroSection from '@/features/provider/ui/ProfileEdit/ExpertIntroSection';
import SkillsSection from '@/features/provider/ui/ProfileEdit/SkillsSection';
import * as S from '@/pages/provider-edit/ProfileEdit.styles';
import { LOCATIONS } from '@/shared/config';
import { useDialog } from '@/shared/lib/useDialog';
import Button from '@/shared/ui/Button';

const ProfileEdit: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasExistingProfile, setHasExistingProfile] = useState(false);

  const { form } = useProfileForm();
  const { alert } = useDialog();

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const response = await getProviderProfile();
        const profile = response.data.content;

        if (!profile) {
          setHasExistingProfile(false);
          return;
        }

        const selectedLocation = profile?.location
          ? LOCATIONS.find((location) => location.name === profile.location)
          : null;

        form.reset({
          introduction: profile?.introduction || '',
          selectedLocation: selectedLocation?.id || null,
          selectedCategory: profile?.categoryId || null,
          skills: profile?.skills || [],
          careers:
            profile?.careers?.map((career) => ({
              ...career,
              documents: [],
            })) || [],
          educations:
            profile?.educations?.map((education) => ({
              ...education,
              documents: [],
            })) || [],
          licenses:
            profile?.licenses?.map((license) => ({
              ...license,
              documents: [],
            })) || [],
          contactHours: profile?.contactHours || { startHour: 0, endHour: 24 },
        });

        setHasExistingProfile(true);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 404) {
          setHasExistingProfile(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [form]);

  const handleEdit = async () => {
    setIsSubmitting(true);
    try {
      const formData = form.getValues();

      const selectedLocation = LOCATIONS.find(
        (location) => location.id === formData.selectedLocation,
      );

      const requestData: ProviderRequestWithFiles = {
        categoryId: formData.selectedCategory!,
        location: selectedLocation?.name || '',
        introduction: formData.introduction,
        contactHours: formData.contactHours,
        skills: formData.skills,
        careers: formData.careers.map((career) => ({
          id: career.id,
          company: career.company,
          position: career.position,
          file: career.documents?.[0]?.file,
        })),
        educations: formData.educations.map((education) => ({
          id: education.id,
          school: education.school,
          major: education.major,
          degree: education.degree,
          file: education.documents?.[0]?.file,
        })),
        licenses: formData.licenses.map((license) => ({
          id: license.id,
          name: license.name,
          file: license.documents?.[0]?.file,
        })),
      };

      if (hasExistingProfile) {
        await updateProviderProfile(requestData);
        await alert({
          title: '프로필 수정 완료',
          content: '프로필이 성공적으로 수정되었습니다.',
        });
      } else {
        await registerProviderProfile(requestData);
        await alert({
          title: '프로필 등록 완료',
          content: '프로필이 성공적으로 등록되었습니다.',
        });
        setHasExistingProfile(true);
      }
    } catch {
      await alert({
        title: `프로필 ${hasExistingProfile ? '수정' : '등록'} 실패`,
        content: `프로필 ${hasExistingProfile ? '수정' : '등록'} 중 오류가 발생했습니다.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <S.Container />;
  }

  return (
    <S.Container>
      <ExpertIntroSection form={form} />
      <SkillsSection form={form} />
      <CareerSection form={form} />
      <EducationSection form={form} />
      <ContactTimeSection form={form} />
      <S.SubmitButtonArea>
        <Button
          size="large"
          fullWidth
          variant="primary"
          onClick={handleEdit}
          disabled={isSubmitting}
        >
          {hasExistingProfile ? '프로필 수정' : '프로필 등록'}
        </Button>
      </S.SubmitButtonArea>
    </S.Container>
  );
};

export default ProfileEdit;
