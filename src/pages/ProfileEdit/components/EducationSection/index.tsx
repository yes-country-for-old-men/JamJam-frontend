import React, { useCallback } from 'react';
import AddIcon from '@assets/icons/add.svg?react';
import DeleteIcon from '@assets/icons/cross.svg?react';
import FileUpload from '@components/FileUpload';
import Input from '@components/Input';
import Select from '@components/Select';
import DocumentsTooltip from '@pages/ProfileEdit/components/DocumentsTooltip';
import { type ProfileForm } from '@pages/ProfileEdit/hooks/useProfileForm';
import * as S from '@pages/ProfileEdit/ProfileEdit.styles';
import type FileWithId from '@type/FileWithId';
import type { Education, License } from '@type/Provider';

interface EducationSectionProps {
  form: ProfileForm;
}

const EducationSection: React.FC<EducationSectionProps> = ({ form }) => {
  const educations = form.watch('educations');
  const licenses = form.watch('licenses');

  const addEducation = useCallback(() => {
    const newEducation: Education & { documents: FileWithId[] } = {
      id: Date.now(),
      school: '',
      major: '',
      degree: '',
      documents: [],
    };
    form.setValue('educations', [...educations, newEducation]);
  }, [educations, form]);

  const removeEducation = useCallback(
    (id: number) => {
      form.setValue(
        'educations',
        educations.filter((edu) => edu.id !== id),
      );
    },
    [educations, form],
  );

  const updateEducation = useCallback(
    (id: number, field: string, value: string | FileWithId[]) => {
      const updatedEducations = educations.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      );
      form.setValue('educations', updatedEducations);
    },
    [educations, form],
  );

  const addLicense = useCallback(() => {
    const newLicense: License & { documents: FileWithId[] } = {
      id: Date.now(),
      name: '',
      documents: [],
    };
    form.setValue('licenses', [...licenses, newLicense]);
  }, [licenses, form]);

  const removeLicense = useCallback(
    (id: number) => {
      form.setValue(
        'licenses',
        licenses.filter((license) => license.id !== id),
      );
    },
    [licenses, form],
  );

  const updateLicense = useCallback(
    (id: number, field: string, value: string | FileWithId[]) => {
      const updatedLicenses = licenses.map((license) =>
        license.id === id ? { ...license, [field]: value } : license,
      );
      form.setValue('licenses', updatedLicenses);
    },
    [licenses, form],
  );

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
