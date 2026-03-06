import { isAxiosError } from 'axios';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import Forbidden from '@/pages/forbidden';
import NotFound from '@/pages/not-found';
import GeneralErrorFallback from '@/shared/ui/ErrorBoundary/GeneralErrorFallback';

const PageErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 404) return <NotFound />;
    if (status === 403) return <Forbidden />;
  }
  return (
    <GeneralErrorFallback
      resetErrorBoundary={resetErrorBoundary}
      showRetryButton
    />
  );
};

const PageErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary FallbackComponent={PageErrorFallback}>
    {children}
  </ErrorBoundary>
);

export default PageErrorBoundary;
