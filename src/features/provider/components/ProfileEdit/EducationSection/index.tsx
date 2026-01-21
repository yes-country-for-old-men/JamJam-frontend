import React from 'react';
import DocumentsTooltip from '@/features/provider/components/ProfileEdit/DocumentsTooltip';
import { type ProfileForm } from '@/features/provider/hooks/useProfileForm';
import * as S from '@/features/provider/pages/ProfileEdit/ProfileEdit.styles';
import AddIcon from '@/shared/assets/icons/add.svg?react';
import DeleteIcon from '@/shared/assets/icons/cross.svg?react';
import FileUpload from '@/shared/components/FileUpload';
import Input from '@/shared/components/Input';
import Select from '@/shared/components/Select';
import type { Education, License } from '@/features/provider/types/Provider';
import type { FileWithId } from '@/shared/types/FileWithId';

interface EducationSectionProps {
  form: ProfileForm;
}

const EducationSection: React.FC<EducationSectionProps> = ({ form }) => {
  const educations = form.watch('educations');
  const licenses = form.watch('licenses');

  const addEducation = () => {
    const newEducation: Education & { documents: FileWithId[] } = {
      id: Date.now(),
      school: '',
      major: '',
      degree: '',
      documents: [],
    };
    form.setValue('educations', [...educations, newEducation]);
  };

  const removeEducation = (id: number) => {
    form.setValue(
      'educations',
      educations.filter((edu) => edu.id !== id),
    );
  };

  const updateEducation = (
    id: number,
    field: string,
    value: string | FileWithId[],
  ) => {
    const updatedEducations = educations.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu,
    );
    form.setValue('educations', updatedEducations);
  };

  const addLicense = () => {
    const newLicense: License & { documents: FileWithId[] } = {
      id: Date.now(),
      name: '',
      documents: [],
    };
    form.setValue('licenses', [...licenses, newLicense]);
  };

  const removeLicense = (id: number) => {
    form.setValue(
      'licenses',
      licenses.filter((license) => license.id !== id),
    );
  };

  const updateLicense = (
    id: number,
    field: string,
    value: string | FileWithId[],
  ) => {
    const updatedLicenses = licenses.map((license) =>
      license.id === id ? { ...license, [field]: value } : license,
    );
    form.setValue('licenses', updatedLicenses);
  };

  return (
    <S.Section>
      <S.SectionTitle>학력 및 자격증</S.SectionTitle>
      <S.SubSectionContainer>
        <S.Label>학력</S.Label>
        {educations.map((education) => (
          <S.ItemCard key={education.id}>
            <S.DeleteButton onClick={() => removeEducation(education.id)}>
              <DeleteIcon />
            </S.DeleteButton>
            <S.FormGroup>
              <S.Label>학교명</S.Label>
              <Input
                placeholder="학교명을 입력하세요"
                value={education.school}
                onChange={(e) =>
                  updateEducation(education.id, 'school', e.target.value)
                }
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>전공</S.Label>
              <Input
                placeholder="전공을 입력하세요"
                value={education.major}
                onChange={(e) =>
                  updateEducation(education.id, 'major', e.target.value)
                }
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>학위</S.Label>
              <Select
                value={education.degree}
                onChange={(e) =>
                  updateEducation(education.id, 'degree', e.target.value)
                }
              >
                <option value="">학위를 선택하세요</option>
                <option value="학사">학사</option>
                <option value="석사">석사</option>
                <option value="박사">박사</option>
              </Select>
            </S.FormGroup>
            <S.FormGroup>
              <S.LabelWithInfo>
                <S.Label>증빙 자료</S.Label>
                <DocumentsTooltip />
              </S.LabelWithInfo>
              <FileUpload
                files={education.documents}
                onFilesChange={(files) =>
                  updateEducation(education.id, 'documents', files)
                }
              />
            </S.FormGroup>
          </S.ItemCard>
        ))}
        <S.AddButton onClick={addEducation}>
          <AddIcon />
          학력 추가
        </S.AddButton>
      </S.SubSectionContainer>
      <S.SubSectionContainer>
        <S.Label>자격증</S.Label>
        {licenses.map((license) => (
          <S.ItemCard key={license.id}>
            <S.DeleteButton onClick={() => removeLicense(license.id)}>
              <DeleteIcon />
            </S.DeleteButton>
            <S.FormGroup>
              <S.Label>자격증 이름</S.Label>
              <Input
                placeholder="자격증 이름을 입력하세요"
                value={license.name}
                onChange={(e) =>
                  updateLicense(license.id, 'name', e.target.value)
                }
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.LabelWithInfo>
                <S.Label>증빙 자료</S.Label>
                <DocumentsTooltip />
              </S.LabelWithInfo>
              <FileUpload
                files={license.documents}
                onFilesChange={(files) =>
                  updateLicense(license.id, 'documents', files)
                }
              />
            </S.FormGroup>
          </S.ItemCard>
        ))}
        <S.AddButton onClick={addLicense}>
          <AddIcon />
          자격증 추가
        </S.AddButton>
      </S.SubSectionContainer>
    </S.Section>
  );
};

export default EducationSection;
