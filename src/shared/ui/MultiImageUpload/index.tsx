import React, { useCallback, useRef } from 'react';
import AddImageIcon from '@/shared/assets/icons/add-image.svg?react';
import useDropZone from '@/shared/lib/useDropZone';
import useFileList from '@/shared/lib/useFileList';
import ImagePreviewItem from './ImagePreviewItem';
import * as S from './MultiImageUpload.styles';
import type { FileWithId } from '@/shared/types/FileWithId';

const IMAGE_FILTER = (file: File) => file.type.startsWith('image/');

interface MultiImageUploadProps {
  images: FileWithId[];
  onImagesChange: (images: FileWithId[]) => void;
  accept?: string;
  maxImages?: number;
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  images,
  onImagesChange,
  accept = 'image/*',
  maxImages = 10,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { addFiles, removeFile, isAtCapacity } = useFileList({
    files: images,
    onChange: onImagesChange,
    maxFiles: maxImages,
    filter: IMAGE_FILTER,
  });

  const handleDrop = useCallback(
    (files: File[]) => addFiles(files),
    [addFiles],
  );

  const { isDragOver, dropZoneProps } = useDropZone({
    onDrop: handleDrop,
    disabled: isAtCapacity,
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addFiles(files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!isAtCapacity) {
      fileInputRef.current?.click();
    }
  };

  const getUploadText = () => {
    if (isDragOver) return '파일을 놓으세요';
    if (isAtCapacity) return `최대 ${maxImages}개까지만 업로드 가능합니다`;
    return '여기로 사진을 끌어오거나 클릭';
  };

  return (
    <S.Container>
      <S.MultipleUploadArea
        isDragOver={isDragOver}
        disabled={isAtCapacity}
        onClick={handleClick}
        {...dropZoneProps}
      >
        <AddImageIcon />
        <S.UploadText>{getUploadText()}</S.UploadText>
      </S.MultipleUploadArea>
      <S.FileInput
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple
        onChange={handleFileSelect}
        disabled={isAtCapacity}
      />
      {images.length > 0 && (
        <S.ImagePreviewGrid>
          {images.map((imageWithId) => (
            <ImagePreviewItem
              key={imageWithId.id}
              file={imageWithId.file}
              onRemove={() => removeFile(imageWithId.id)}
            />
          ))}
        </S.ImagePreviewGrid>
      )}
    </S.Container>
  );
};

export default MultiImageUpload;
