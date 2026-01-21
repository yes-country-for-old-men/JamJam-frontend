import React, { useState, useRef } from 'react';
import DeleteIcon from '@/shared/assets/icons/cross.svg?react';
import ImageIcon from '@/shared/assets/icons/image.svg?react';
import * as S from './ImageUpload.styles';
import type { FileWithId } from '@/shared/types/FileWithId';

interface ImageUploadProps {
  image?: File | string | null;
  images?: FileWithId[];
  onImageChange?: (image: File | null) => void;
  onImagesChange?: (images: FileWithId[]) => void;
  accept?: string;
  width?: number;
  height?: number;
  multiple?: boolean;
  maxImages?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  image,
  images = [],
  onImageChange,
  onImagesChange,
  accept = 'image/*',
  width,
  height,
  multiple = false,
  maxImages = 10,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const getImageSrc = () => {
    if (!image) return null;
    if (typeof image === 'string') return image;
    return URL.createObjectURL(image);
  };

  const remainingSlots = multiple ? maxImages - images.length : 0;
  const isDisabled = multiple && remainingSlots <= 0;

  const processImageFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));

    if (multiple && onImagesChange) {
      const filesToAdd = imageFiles.slice(0, remainingSlots);
      const newFilesWithId = filesToAdd.map((file) => ({
        id: crypto.randomUUID(),
        file,
      }));
      onImagesChange([...images, ...newFilesWithId]);
    } else if (onImageChange && imageFiles.length > 0) {
      onImageChange(imageFiles[0]);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    processImageFiles(selectedFiles);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onImageChange) {
      onImageChange(null);
    }
  };

  const handleRemoveMultipleImage = (fileId: string | number) => {
    if (onImagesChange) {
      const newImages = images.filter((fileWithId) => fileWithId.id !== fileId);
      onImagesChange(newImages);
    }
  };

  const handleUploadAreaClick = () => {
    if (!isDisabled) {
      fileInputRef.current?.click();
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (!isDisabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    if (isDisabled) return;

    const droppedFiles = Array.from(event.dataTransfer.files);
    processImageFiles(droppedFiles);
  };

  const getMultipleUploadText = () => {
    if (isDragOver) return '파일을 놓으세요';
    if (isDisabled) return `최대 ${maxImages}개까지만 업로드 가능합니다`;
    return '여기로 사진을 끌어오거나 클릭';
  };

  const getSingleUploadText = () => {
    if (isDragOver) return '파일을 놓으세요';
    return '사진 업로드';
  };

  if (multiple) {
    return (
      <S.Container style={{ width, height }}>
        <S.MultipleUploadArea
          isDragOver={isDragOver}
          disabled={isDisabled}
          onClick={handleUploadAreaClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <ImageIcon />
          <S.MultipleUploadText>{getMultipleUploadText()}</S.MultipleUploadText>
        </S.MultipleUploadArea>
        <S.FileInput
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleFileSelect}
          disabled={isDisabled}
        />
        {images.length > 0 && (
          <S.ImagePreviewGrid>
            {images.map((imageWithId) => (
              <S.ImagePreviewItem key={imageWithId.id}>
                <S.PreviewImage
                  src={URL.createObjectURL(imageWithId.file)}
                  alt="image"
                />
                <S.ImageRemoveButton
                  onClick={() => handleRemoveMultipleImage(imageWithId.id)}
                >
                  <DeleteIcon />
                </S.ImageRemoveButton>
              </S.ImagePreviewItem>
            ))}
          </S.ImagePreviewGrid>
        )}
      </S.Container>
    );
  }

  const imageSrc = getImageSrc();

  return (
    <S.Container style={{ width, height }}>
      <S.ImageUploadArea
        isDragOver={isDragOver}
        hasImage={!!image}
        onClick={handleUploadAreaClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {imageSrc ? (
          <>
            <S.ImageBackground src={imageSrc} alt="uploaded-image" />
            <S.ImageOverlay>
              <ImageIcon style={{ fill: 'white' }} />
              <S.OverlayText>클릭하여 변경</S.OverlayText>
            </S.ImageOverlay>
            <S.DeleteButton onClick={handleRemoveImage}>
              <DeleteIcon />
            </S.DeleteButton>
          </>
        ) : (
          <S.PlaceholderContainer>
            <ImageIcon />
            <S.UploadText>{getSingleUploadText()}</S.UploadText>
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

export default ImageUpload;
