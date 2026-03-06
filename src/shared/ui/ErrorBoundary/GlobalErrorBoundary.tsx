import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import GeneralErrorFallback from '@/shared/ui/ErrorBoundary/GeneralErrorFallback';

const GlobalErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ErrorBoundary FallbackComponent={GeneralErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};

export default GlobalErrorBoundary;
