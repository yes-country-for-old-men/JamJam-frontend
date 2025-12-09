import React, { useState, useRef, useCallback } from 'react';
import DeleteIcon from '@assets/icons/cross.svg?react';
import ImageIcon from '@assets/icons/image.svg?react';
import { Z_INDEX } from '@constants/index';
import styled from '@emotion/styled';
import type FileWithId from '@type/FileWithId';

const Container = styled.div`
  position: relative;
`;

const ImageUploadArea = styled.div<{ isDragOver: boolean; hasImage: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border: none;
  border-radius: 12px;
  text-align: center;
  padding: ${(props) => (props.hasImage ? '0' : '16px')};
  transition: all 0.2s ease;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.MAIN.SECONDARY};
    border-color: ${(props) => props.theme.COLORS.MAIN.PRIMARY};

    ${(props) =>
      !props.hasImage &&
      `
      & svg {
        fill: ${props.theme.COLORS.MAIN.PRIMARY};
      }
      & div {
        color: ${props.theme.COLORS.MAIN.PRIMARY};
      }
    `}
  }

  ${(props) =>
    props.isDragOver &&
    !props.hasImage &&
    `
    background-color: ${props.theme.COLORS.MAIN.SECONDARY};

    & svg {
      fill: ${props.theme.COLORS.MAIN.PRIMARY};
    }
    & div {
      color: ${props.theme.COLORS.MAIN.PRIMARY};
    }
  `}
`;

const MultipleUploadArea = styled.div<{
  isDragOver: boolean;
  disabled: boolean;
}>`
  background-color: ${(props) =>
    props.isDragOver
      ? props.theme.COLORS.MAIN.SECONDARY
      : props.theme.COLORS.GRAY[6]};
  border: 1px dashed
    ${(props) =>
      props.isDragOver
        ? props.theme.COLORS.MAIN.PRIMARY
        : props.theme.COLORS.GRAY[4]};
  border-radius: 12px;
  text-align: center;
  padding: 48px;
  transition: all 0.2s ease;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? props.theme.COLORS.GRAY[6]
        : props.theme.COLORS.MAIN.SECONDARY};
    border-color: ${(props) =>
      props.disabled
        ? props.theme.COLORS.GRAY[4]
        : props.theme.COLORS.MAIN.PRIMARY};

    & svg {
      fill: ${(props) =>
        props.disabled
          ? props.theme.COLORS.LABEL.SECONDARY
          : props.theme.COLORS.MAIN.PRIMARY};
    }
    & div {
      color: ${(props) =>
        props.disabled
          ? props.theme.COLORS.LABEL.SECONDARY
          : props.theme.COLORS.MAIN.PRIMARY};
    }
  }

  ${(props) =>
    props.isDragOver &&
    !props.disabled &&
    `
    & svg {
      fill: ${props.theme.COLORS.MAIN.PRIMARY};
    }
    & div {
      color: ${props.theme.COLORS.MAIN.PRIMARY};
    }
  `}
`;

const ImageBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const ImageOverlay = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.2s ease;
  border-radius: 6px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  ${ImageUploadArea}:hover & {
    opacity: 1;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const UploadText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  margin-top: 12px;
`;

const MultipleUploadText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  margin-top: 8px;
`;

const OverlayText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: white;
  margin-top: 8px;
`;

const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const DeleteButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  transition: all 0.2s ease;
  z-index: ${Z_INDEX.IMAGE_OVERLAY};

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  & svg {
    fill: white;
    width: 10px;
    height: 10px;
  }
`;

const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-top: 16px;
`;

const ImagePreviewItem = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  border-radius: 12px;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageRemoveButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  & svg {
    fill: white;
    width: 8px;
    height: 8px;
  }
`;

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

  const getImageSrc = useCallback(() => {
    if (!image) return null;
    if (typeof image === 'string') return image;
    return URL.createObjectURL(image);
  }, [image]);

  const remainingSlots = multiple ? maxImages - images.length : 0;
  const isDisabled = multiple && remainingSlots <= 0;

  const processImageFiles = useCallback(
    (files: File[]) => {
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
    },
    [multiple, onImageChange, onImagesChange, images, remainingSlots],
  );

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(event.target.files || []);
      processImageFiles(selectedFiles);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [processImageFiles],
  );

  const handleRemoveImage = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (onImageChange) {
        onImageChange(null);
      }
    },
    [onImageChange],
  );

  const handleRemoveMultipleImage = useCallback(
    (fileId: string | number) => {
      if (onImagesChange) {
        const newImages = images.filter(
          (fileWithId) => fileWithId.id !== fileId,
        );
        onImagesChange(newImages);
      }
    },
    [images, onImagesChange],
  );

  const handleUploadAreaClick = useCallback(() => {
    if (!isDisabled) {
      fileInputRef.current?.click();
    }
  }, [isDisabled]);

  const handleDragOver = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!isDisabled) {
        setIsDragOver(true);
      }
    },
    [isDisabled],
  );

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragOver(false);

      if (isDisabled) return;

      const droppedFiles = Array.from(event.dataTransfer.files);
      processImageFiles(droppedFiles);
    },
    [processImageFiles, isDisabled],
  );

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
      <Container style={{ width, height }}>
        <MultipleUploadArea
          isDragOver={isDragOver}
          disabled={isDisabled}
          onClick={handleUploadAreaClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <ImageIcon />
          <MultipleUploadText>{getMultipleUploadText()}</MultipleUploadText>
        </MultipleUploadArea>
        <FileInput
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleFileSelect}
          disabled={isDisabled}
        />
        {images.length > 0 && (
          <ImagePreviewGrid>
            {images.map((imageWithId) => (
              <ImagePreviewItem key={imageWithId.id}>
                <PreviewImage
                  src={URL.createObjectURL(imageWithId.file)}
                  alt="image"
                />
                <ImageRemoveButton
                  onClick={() => handleRemoveMultipleImage(imageWithId.id)}
                >
                  <DeleteIcon />
                </ImageRemoveButton>
              </ImagePreviewItem>
            ))}
          </ImagePreviewGrid>
        )}
      </Container>
    );
  }

  const imageSrc = getImageSrc();

  return (
    <Container style={{ width, height }}>
      <ImageUploadArea
        isDragOver={isDragOver}
        hasImage={!!image}
        onClick={handleUploadAreaClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {imageSrc ? (
          <>
            <ImageBackground src={imageSrc} alt="uploaded-image" />
            <ImageOverlay>
              <ImageIcon style={{ fill: 'white' }} />
              <OverlayText>클릭하여 변경</OverlayText>
            </ImageOverlay>
            <DeleteButton onClick={handleRemoveImage}>
              <DeleteIcon />
            </DeleteButton>
          </>
        ) : (
          <PlaceholderContainer>
            <ImageIcon />
            <UploadText>{getSingleUploadText()}</UploadText>
          </PlaceholderContainer>
        )}
      </ImageUploadArea>
      <FileInput
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
      />
    </Container>
  );
};

export default ImageUpload;
