import React from 'react';
import * as S from './HTMLContent.styles';

interface HTMLContentProps {
  content: string;
  className?: string;
}

const HTMLContent: React.FC<HTMLContentProps> = ({ content, className }) => {
  return (
    <S.StyledHTMLContent
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default HTMLContent;
