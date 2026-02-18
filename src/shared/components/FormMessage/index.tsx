import React from 'react';
import * as S from '@/shared/components/FormMessage/FormMessage.styles';

interface FormMessageProps {
  type: 'success' | 'error' | 'info';
  message: string;
}

const FormMessage: React.FC<FormMessageProps> = ({ type, message }) => {
  if (!message) return null;

  switch (type) {
    case 'success':
      return <S.SuccessMessage>{message}</S.SuccessMessage>;
    case 'error':
      return <S.InvalidMessage>{message}</S.InvalidMessage>;
    case 'info':
      return <S.InfoMessage>{message}</S.InfoMessage>;
    default:
      return null;
  }
};

export default FormMessage;
