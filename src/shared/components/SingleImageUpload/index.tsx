import React, { useRef, useCallback } from 'react';
import AddImageIcon from '@/shared/assets/icons/add-image.svg?react';
import DeleteIcon from '@/shared/assets/icons/cross.svg?react';
import ReplaceImageIcon from '@/shared/assets/icons/replace-image.svg?react';
import useDropZone from '@/shared/hooks/useDropZone';
import useObjectUrl from '@/shared/hooks/useObjectUrl';
import * as S from './SingleImageUpload.styles';

interface SingleImageUploadProps {
  image: File | string | null;
  onImageChange: (image: File | null) => void;
  accept?: string;
  width?: number;
  height?: number;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  image,
  onImageChange,
  accept = 'image/*',
  width,
  height,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageSrc = useObjectUrl(image);

  const handleDrop = useCallback(
    (files: File[]) => {
      const imageFile = files.find((f) => f.type.startsWith('image/'));
      if (imageFile) {
        onImageChange(imageFile);
      }
    },
    [onImageChange],
  );

  const { isDragOver, dropZoneProps } = useDropZone({ onDrop: handleDrop });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageChange(null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <S.Container style={{ width, height }}>
      <S.ImageUploadArea
        isDragOver={isDragOver}
        hasImage={!!image}
        onClick={handleClick}
        {...dropZoneProps}
      >
        {imageSrc ? (
          <>
            <S.ImageBackground src={imageSrc} alt="uploaded-image" />
            <S.ImageOverlay>
              <ReplaceImageIcon style={{ fill: 'white' }} />
              <S.OverlayText>클릭하여 변경</S.OverlayText>
            </S.ImageOverlay>
            <S.DeleteButton onClick={handleRemove}>
              <DeleteIcon />
            </S.DeleteButton>
          </>
        ) : (
          <S.PlaceholderContainer>
            <AddImageIcon />
            <S.UploadText>
              {isDragOver ? '파일을 놓으세요' : '사진 업로드'}
            </S.UploadText>
          </S.PlaceholderContainer>
        )}
      </S.ImageUploadArea>
      <S.FileInput
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
      />
    </S.Container>
  );
};

export default SingleImageUpload;
