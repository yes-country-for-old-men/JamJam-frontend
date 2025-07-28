import React from 'react';
import { type UseFormReturn, Controller } from 'react-hook-form';
import { type EditInfoData } from '@pages/UserInfoEdit/schemas/editableInfoSchemas';
import { type MessageState } from '@type/MessageState';
import * as S from '@pages/UserInfoEdit/UserInfoEdit.styles';
import Input from '@components/Input';
import Button from '@components/Button';
import ImageUpload from '@components/ImageUpload';

interface BasicInfoSectionProps {
  form: UseFormReturn<EditInfoData>;
  nicknameMessage: MessageState;
  isCheckingNickname: boolean;
  onNicknameChange: (value: string, setValue: any) => void;
  onNicknameCheck: (nickname: string) => void;
  renderMessage: (message: MessageState) => React.ReactNode;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  form,
  nicknameMessage,
  isCheckingNickname,
  onNicknameChange,
  onNicknameCheck,
  renderMessage,
}) => {
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
            <Controller
              name="nickname"
              control={form.control}
              render={({ field }) => (
                <Input
                  placeholder="10자 이내의 한글, 영문, 숫자 조합"
                  value={field.value}
                  onChange={(e) => {
                    const { value } = e.target;
                    onNicknameChange(value, (infoField: string, val: any) =>
                      form.setValue(infoField as keyof EditInfoData, val),
                    );
                  }}
                />
              )}
            />
          </S.FlexInputWrapper>
          <S.ActionButtonWrapper>
            <Button
              type="button"
              fullWidth
              onClick={() => onNicknameCheck(form.getValues('nickname'))}
              disabled={isCheckingNickname || !form.watch('nickname')}
            >
              중복 확인
            </Button>
          </S.ActionButtonWrapper>
        </S.FlexInputGroup>
        {form.formState.errors.nickname && (
          <S.InvalidMessage>
            {form.formState.errors.nickname.message}
          </S.InvalidMessage>
        )}
        {renderMessage(nicknameMessage)}
      </S.FieldGroup>
    </S.ContentSection>
  );
};

export default BasicInfoSection;
