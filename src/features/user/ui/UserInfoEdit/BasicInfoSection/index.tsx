import React from 'react';
import { type InfoEditForm } from '@/features/user/model/useInfoEditForm';
import * as S from '@/pages/user-info-edit/UserInfoEdit.styles';
import Button from '@/shared/ui/Button';
import FormMessage from '@/shared/ui/FormMessage';
import Input from '@/shared/ui/Input';
import SingleImageUpload from '@/shared/ui/SingleImageUpload';

interface BasicInfoSectionProps {
  form: InfoEditForm;
  isNicknameAvailable: boolean | null;
  isCheckingNickname: boolean;
  onNicknameChange: () => void;
  onNicknameCheck: () => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  form,
  isNicknameAvailable,
  isCheckingNickname,
  onNicknameChange,
  onNicknameCheck,
}) => {
  const nicknameError = form.formState.errors.nickname;

  const getNicknameMessage = () => {
    if (nicknameError) {
      return <FormMessage type="error" message={nicknameError.message || ''} />;
    }
    if (isNicknameAvailable === true) {
      return <FormMessage type="success" message="사용 가능한 닉네임입니다." />;
    }
    if (isNicknameAvailable === false) {
      return (
        <FormMessage type="error" message="이미 사용 중인 닉네임입니다." />
      );
    }
    return null;
  };

  return (
    <S.ContentSection>
      <S.SectionHeader>기본 정보</S.SectionHeader>
      <S.FieldGroup>
        <S.FieldLabel>프로필 사진</S.FieldLabel>
        <SingleImageUpload
          image={form.watch('profileUrl') ?? null}
          onImageChange={(image) => form.setValue('profileUrl', image)}
          width={160}
          height={160}
        />
      </S.FieldGroup>
      <S.FieldGroup>
        <S.FieldLabel>닉네임</S.FieldLabel>
        <S.FlexInputGroup>
          <S.FlexInputWrapper>
            <Input
              placeholder="10자 이내의 한글, 영문, 숫자 조합"
              {...form.register('nickname', {
                onChange: onNicknameChange,
              })}
            />
          </S.FlexInputWrapper>
          <S.ActionButtonWrapper>
            <Button
              type="button"
              fullWidth
              onClick={onNicknameCheck}
              disabled={isCheckingNickname || !form.watch('nickname')}
            >
              중복 확인
            </Button>
          </S.ActionButtonWrapper>
        </S.FlexInputGroup>
        {getNicknameMessage()}
      </S.FieldGroup>
    </S.ContentSection>
  );
};

export default BasicInfoSection;
