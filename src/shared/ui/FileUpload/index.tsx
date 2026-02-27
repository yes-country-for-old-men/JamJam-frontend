import React, { useCallback, useRef } from 'react';
import DeleteIcon from '@/shared/assets/icons/cross.svg?react';
import UploadIcon from '@/shared/assets/icons/file-upload.svg?react';
import useDropZone from '@/shared/lib/useDropZone';
import useFileList from '@/shared/lib/useFileList';
import * as S from './FileUpload.styles';
import type { FileWithId } from '@/shared/types/FileWithId';

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

  const { addFiles, removeFile } = useFileList({
    files,
    onChange: onFilesChange,
  });

  const handleDrop = useCallback(
    (droppedFiles: File[]) => addFiles(droppedFiles),
    [addFiles],
  );

  const { isDragOver, dropZoneProps } = useDropZone({ onDrop: handleDrop });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFiles(selectedFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <S.Container>
      <S.FileUploadArea
        isDragOver={isDragOver}
        onClick={() => fileInputRef.current?.click()}
        {...dropZoneProps}
      >
        <UploadIcon />
        <S.FileUploadText>
          {isDragOver ? '파일을 놓으세요' : '여기로 파일을 끌어오거나 클릭'}
        </S.FileUploadText>
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
              <S.FileRemoveButton onClick={() => removeFile(fileWithId.id)}>
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
