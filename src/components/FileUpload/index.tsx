import React, { useState, useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import type FileWithId from '@type/FileWithId';
import UploadIcon from '@assets/icons/upload.svg?react';
import DeleteIcon from '@assets/icons/cross.svg?react';

const Container = styled.div`
  margin-top: 12px;
`;

const FileUploadArea = styled.div<{ isDragOver: boolean }>`
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border: 1px dashed
    ${(props) =>
      props.isDragOver
        ? props.theme.COLORS.JAMJAM_PRIMARY[1]
        : props.theme.COLORS.GRAY[4]};
  border-radius: 12px;
  text-align: center;
  transition: all 0.2s ease;
  padding: 48px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[2]};
    border-color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};

    & svg {
      fill: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
    }
    & div {
      color: ${(props) => props.theme.COLORS.JAMJAM_PRIMARY[1]};
    }
  }

  ${(props) =>
    props.isDragOver &&
    `
    background-color: ${props.theme.COLORS.JAMJAM_PRIMARY[2]};

    & svg {
      fill: ${props.theme.COLORS.JAMJAM_PRIMARY[1]};
    }
    & div {
      color: ${props.theme.COLORS.JAMJAM_PRIMARY[1]};
    }
  `}
`;

const FileInput = styled.input`
  display: none;
`;

const FileUploadText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  margin-top: 8px;
`;

const FileList = styled.div`
  margin-top: 12px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.COLORS.GRAY[6]};
  border-radius: 6px;
  font-size: 14px;
  padding: 8px 12px;
  margin-bottom: 4px;
`;

const FileName = styled.span`
  flex: 1;
  color: ${(props) => props.theme.COLORS.LABEL_PRIMARY};
  margin-right: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FileRemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.COLORS.LABEL_SECONDARY};
  padding: 2px;

  &:hover {
    color: ${(props) => props.theme.COLORS.LABEL_PRIMARY};
  }
`;

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
    <Container>
      <FileUploadArea
        isDragOver={isDragOver}
        onClick={handleUploadAreaClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadIcon />
        <FileUploadText>{getUploadText()}</FileUploadText>
      </FileUploadArea>
      <FileInput
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleFileSelect}
      />
      {files.length > 0 && (
        <FileList>
          {files.map((fileWithId) => (
            <FileItem key={fileWithId.id}>
              <FileName>{fileWithId.file.name}</FileName>
              <FileRemoveButton onClick={() => handleRemoveFile(fileWithId.id)}>
                <DeleteIcon />
              </FileRemoveButton>
            </FileItem>
          ))}
        </FileList>
      )}
    </Container>
  );
};

export default FileUpload;
