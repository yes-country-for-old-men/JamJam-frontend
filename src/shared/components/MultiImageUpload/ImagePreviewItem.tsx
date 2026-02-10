import React from 'react';
import DeleteIcon from '@/shared/assets/icons/cross.svg?react';
import useObjectUrl from '@/shared/hooks/useObjectUrl';
import * as S from './MultiImageUpload.styles';

interface ImagePreviewItemProps {
  file: File;
  onRemove: () => void;
}

const ImagePreviewItem: React.FC<ImagePreviewItemProps> = ({
  file,
  onRemove,
}) => {
  const src = useObjectUrl(file);

  if (!src) return null;

  return (
    <S.ImagePreviewItem>
      <S.PreviewImage src={src} alt="image" />
      <S.ImageRemoveButton onClick={onRemove}>
        <DeleteIcon />
      </S.ImageRemoveButton>
    </S.ImagePreviewItem>
  );
};

export default ImagePreviewItem;
