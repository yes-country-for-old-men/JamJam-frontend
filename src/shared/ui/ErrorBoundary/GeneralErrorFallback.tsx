import AlertIcon from '@/shared/assets/icons/alert.svg?react';
import Button from '@/shared/ui/Button';
import * as S from './GeneralErrorFallback.styles';
import type { FallbackProps } from 'react-error-boundary';

interface GeneralErrorFallbackProps
  extends Pick<FallbackProps, 'resetErrorBoundary'> {
  showRetryButton?: boolean;
}

const handleGoHome = () => {
  window.location.href = '/';
};

const GeneralErrorFallback = ({
  resetErrorBoundary,
  showRetryButton = false,
}: GeneralErrorFallbackProps) => (
  <S.Container>
    <AlertIcon />
    <S.Title>오류가 발생했습니다</S.Title>
    <S.Description>잠시 후 다시 시도해 주세요.</S.Description>
    <S.ActionButtonsWrapper>
      {showRetryButton && (
        <Button onClick={resetErrorBoundary}>다시 시도</Button>
      )}
      <Button variant="outline" onClick={handleGoHome}>
        메인 페이지
      </Button>
    </S.ActionButtonsWrapper>
  </S.Container>
);

export default GeneralErrorFallback;
