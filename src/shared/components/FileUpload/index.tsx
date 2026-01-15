import React, { useState, useRef, useCallback } from 'react';
import DeleteIcon from '@/shared/assets/icons/cross.svg?react';
import UploadIcon from '@/shared/assets/icons/upload.svg?react';
import * as S from './FileUpload.styles';
import type FileWithId from '@/shared/types/FileWithId';

interface FileUploadProps {
  files: FileWithId[];
  onFilesChange: (files: FileWithId[]) => void;
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  files,
  onFilesChange,
  accept = '*',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(event.target.files || []);
      const newFilesWithId = selectedFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
      }));
      onFilesChange([...files, ...newFilesWithId]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [files, onFilesChange],
  );

  const handleRemoveFile = useCallback(
    (fileId: string | number) => {
      const newFiles = files.filter((fileWithId) => fileWithId.id !== fileId);
      onFilesChange(newFiles);
    },
    [files, onFilesChange],
  );

  const handleUploadAreaClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragOver(false);

      const droppedFiles = Array.from(event.dataTransfer.files);
      const newFilesWithId = droppedFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
      }));
      onFilesChange([...files, ...newFilesWithId]);
    },
    [files, onFilesChange],
  );

  const getUploadText = () => {
    if (isDragOver) return '파일을 놓으세요';
    return '여기로 파일을 끌어오거나 클릭';
  };

  return (
    <S.Container>
      <S.FileUploadArea
        isDragOver={isDragOver}
        onClick={handleUploadAreaClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadIcon />
        <S.FileUploadText>{getUploadText()}</S.FileUploadText>
      </S.FileUploadArea>
      <S.FileInput
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleFileSelect}
      />
      {files.length > 0 && (
        <S.FileList>
          {files.map((fileWithId) => (
            <S.FileItem key={fileWithId.id}>
              <S.FileName>{fileWithId.file.name}</S.FileName>
              <S.FileRemoveButton
                onClick={() => handleRemoveFile(fileWithId.id)}
              >
                <DeleteIcon />
              </S.FileRemoveButton>
            </S.FileItem>
          ))}
        </S.FileList>
      )}
    </S.Container>
  );
};

export default FileUpload;
