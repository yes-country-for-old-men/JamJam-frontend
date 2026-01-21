import React from 'react';
import DocumentsTooltip from '@/features/provider/components/ProfileEdit/DocumentsTooltip';
import { type ProfileForm } from '@/features/provider/hooks/useProfileForm';
import * as S from '@/features/provider/pages/ProfileEdit/ProfileEdit.styles';
import { type Career } from '@/features/provider/types/Provider';
import AddIcon from '@/shared/assets/icons/add.svg?react';
import DeleteIcon from '@/shared/assets/icons/cross.svg?react';
import FileUpload from '@/shared/components/FileUpload';
import Input from '@/shared/components/Input';
import type { FileWithId } from '@/shared/types/FileWithId';

interface CareerSectionProps {
  form: ProfileForm;
}

const CareerSection: React.FC<CareerSectionProps> = ({ form }) => {
  const careers = form.watch('careers');

  const addCareer = () => {
    const newCareer: Career & { documents: FileWithId[] } = {
      id: Date.now(),
      company: '',
      position: '',
      documents: [],
    };
    form.setValue('careers', [...careers, newCareer]);
  };

  const removeCareer = (id: number) => {
    form.setValue(
      'careers',
      careers.filter((career) => career.id !== id),
    );
  };

  const updateCareer = (
    id: number,
    field: string,
    value: string | FileWithId[],
  ) => {
    const updatedCareers = careers.map((career) =>
      career.id === id ? { ...career, [field]: value } : career,
    );
    form.setValue('careers', updatedCareers);
  };

  return (
    <S.Section>
      <S.SectionTitle>경력 사항</S.SectionTitle>
      {careers.map((career) => (
        <S.ItemCard key={career.id}>
          <S.DeleteButton onClick={() => removeCareer(career.id)}>
            <DeleteIcon />
          </S.DeleteButton>
          <S.FormGroup>
            <S.Label>단체명</S.Label>
            <Input
              placeholder="단체명을 입력하세요"
              value={career.company}
              onChange={(e) =>
                updateCareer(career.id, 'company', e.target.value)
              }
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>직책/역할</S.Label>
            <Input
              placeholder="직책이나 역할을 입력하세요"
              value={career.position}
              onChange={(e) =>
                updateCareer(career.id, 'position', e.target.value)
              }
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.LabelWithInfo>
              <S.Label>증빙 자료</S.Label>
              <DocumentsTooltip />
            </S.LabelWithInfo>
            <FileUpload
              files={career.documents}
              onFilesChange={(files) =>
                updateCareer(career.id, 'documents', files)
              }
            />
          </S.FormGroup>
        </S.ItemCard>
      ))}
      <S.AddButton onClick={addCareer}>
        <AddIcon />
        경력 추가
      </S.AddButton>
    </S.Section>
  );
};

export default CareerSection;
