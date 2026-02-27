import React from 'react';
import { type InfoEditForm } from '@/features/user/model/useInfoEditForm';
import * as S from '@/pages/user-info-edit/UserInfoEdit.styles';
import { BANK_CODE_MAP } from '@/shared/config';
import Input from '@/shared/ui/Input';
import Select from '@/shared/ui/Select';

const BANKS = Object.entries(BANK_CODE_MAP).map(([code, name]) => ({
  code,
  name,
}));

interface AccountSectionProps {
  form: InfoEditForm;
}

const AccountSection: React.FC<AccountSectionProps> = ({ form }) => {
  return (
    <S.ContentSection>
      <S.SectionHeader>계좌 정보</S.SectionHeader>
      <S.FieldGroup>
        <S.FieldLabel>은행</S.FieldLabel>
        <Select {...form.register('bankName')}>
          <option value="">은행을 선택하세요</option>
          {BANKS.map((bank) => (
            <option key={bank.code} value={bank.name}>
              {bank.name}
            </option>
          ))}
        </Select>
      </S.FieldGroup>
      <S.FieldGroup>
        <S.FieldLabel>계좌번호</S.FieldLabel>
        <Input
          placeholder="하이픈(-) 제외하고 입력"
          {...form.register('accountNumber')}
        />
      </S.FieldGroup>
      <S.FieldGroup>
        <S.FieldLabel>예금주</S.FieldLabel>
        <Input
          placeholder="예금주 이름을 입력하세요"
          {...form.register('accountHolder')}
        />
      </S.FieldGroup>
    </S.ContentSection>
  );
};

export default AccountSection;
