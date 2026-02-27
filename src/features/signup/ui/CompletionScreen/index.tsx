import React from 'react';
import * as S from '@/features/signup/ui/CompletionScreen/CompletionScreen.styles';
import CompletionIcon from '@/shared/assets/icons/completion.svg?react';

interface CompletionScreenProps {
  userNickname: string;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({
  userNickname,
}) => {
  return (
    <S.Container>
      <S.CompletionIconWrapper>
        <CompletionIcon />
      </S.CompletionIconWrapper>
      <div>
        <S.Title>회원가입이 완료되었어요!</S.Title>
        <S.CompletionPrompt>
          {userNickname} 님의 회원가입을 환영합니다.
          {'\n'}
          이제 잼잼의 다양한 서비스를 이용하실 수 있습니다.
        </S.CompletionPrompt>
      </div>
    </S.Container>
  );
};

export default CompletionScreen;
