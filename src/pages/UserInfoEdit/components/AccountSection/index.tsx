import React from 'react';
import { Controller } from 'react-hook-form';
import { type InfoEditForm } from '@pages/UserInfoEdit/hooks/useInfoEditForm';
import * as S from '@pages/UserInfoEdit/UserInfoEdit.styles';
import Input from '@components/Input';
import Select from '@components/Select';
import BANK_CODE_MAP from '@constants/bankCodes';

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
        <Controller
          name="bankName"
          control={form.control}
          render={({ field }) => (
            <Select value={field.value || ''} onChange={field.onChange}>
              <option value="">은행을 선택하세요</option>
              {BANKS.map((bank) => (
                <option key={bank.code} value={bank.name}>
                  {bank.name}
                </option>
              ))}
            </Select>
          )}
        />
      </S.FieldGroup>
      <S.FieldGroup>
        <S.FieldLabel>계좌번호</S.FieldLabel>
        <Controller
          name="accountNumber"
          control={form.control}
          render={({ field }) => (
            <Input
              placeholder="하이픈(-) 제외하고 입력"
              value={field.value || ''}
              onChange={field.onChange}
            />
          )}
        />
      </S.FieldGroup>
      <S.FieldGroup>
        <S.FieldLabel>예금주</S.FieldLabel>
        <Controller
          name="accountHolder"
          control={form.control}
          render={({ field }) => (
            <Input
              placeholder="예금주 이름을 입력하세요"
              value={field.value || ''}
              onChange={field.onChange}
            />
          )}
        />
      </S.FieldGroup>
    </S.ContentSection>
  );
};

export default AccountSection;
