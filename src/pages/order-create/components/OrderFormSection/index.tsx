import React from 'react';
import DateSelector from '@/pages/order-create/components/DateSelector';
import FileUpload from '@/shared/ui/FileUpload';
import Input from '@/shared/ui/Input';
import * as S from './OrderFormSection.styles';
import type { OrderFormData } from '@/entities/order/model/Order';
import type { FileWithId } from '@/shared/types/FileWithId';

interface OrderFormSectionProps {
  formData: OrderFormData;
  onInputChange: (field: string, value: string) => void;
  onDateChange: (field: string, value: string) => void;
  onFilesChange: (files: FileWithId[]) => void;
}

const OrderFormSection: React.FC<OrderFormSectionProps> = ({
  formData,
  onInputChange,
  onDateChange,
  onFilesChange,
}) => (
  <>
    <S.Section>
      <S.FormGroup>
        <S.Label>제목</S.Label>
        <Input
          placeholder="제목을 입력해 주세요"
          value={formData.title}
          onChange={(e) => onInputChange('title', e.target.value)}
        />
      </S.FormGroup>
      <S.FormGroup>
        <S.Label>마감일</S.Label>
        <DateSelector formData={formData} onDateChange={onDateChange} />
      </S.FormGroup>
    </S.Section>

    <S.Section>
      <S.FormGroup>
        <S.Label>의뢰 내용</S.Label>
        <S.TextArea
          placeholder="의뢰 내용을 작성해 주세요"
          value={formData.content}
          onChange={(e) => onInputChange('content', e.target.value)}
          maxLength={1000}
        />
        <S.CharacterCounter>
          {formData.content.length}/1000자
        </S.CharacterCounter>
      </S.FormGroup>
    </S.Section>

    <S.Section>
      <S.Label>참고 자료</S.Label>
      <S.FormGroup>
        <FileUpload files={formData.files} onFilesChange={onFilesChange} />
      </S.FormGroup>
    </S.Section>
  </>
);

export default OrderFormSection;
