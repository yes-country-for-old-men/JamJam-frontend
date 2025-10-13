import React from 'react';
import { type InfoEditForm } from '@pages/UserInfoEdit/hooks/useInfoEditForm';
import * as S from '@pages/UserInfoEdit/UserInfoEdit.styles';
import Input from '@components/Input';
import Button from '@components/Button';
import ImageUpload from '@components/ImageUpload';

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
      return <S.InvalidMessage>{nicknameError.message}</S.InvalidMessage>;
    }
    if (isNicknameAvailable === true) {
      return <S.SuccessMessage>사용 가능한 닉네임입니다.</S.SuccessMessage>;
    }
    if (isNicknameAvailable === false) {
      return <S.InvalidMessage>이미 사용 중인 닉네임입니다.</S.InvalidMessage>;
    }
    return null;
  };

  return (
    <S.ContentSection>
      <S.SectionHeader>기본 정보</S.SectionHeader>
      <S.FieldGroup>
        <S.FieldLabel>프로필 사진</S.FieldLabel>
        <ImageUpload
          image={form.watch('profileUrl')}
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
