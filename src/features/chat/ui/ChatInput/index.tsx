import React, { useRef, useState } from 'react';
import { uploadChatFiles } from '@/entities/chat/api/chatApi';
import * as S from '@/features/chat/ui/ChatInput/ChatInput.styles';
import AttachmentIcon from '@/shared/assets/icons/attachment.svg?react';
import CrossIcon from '@/shared/assets/icons/cross.svg?react';
import FileIcon from '@/shared/assets/icons/file.svg?react';
import PictureIcon from '@/shared/assets/icons/picture.svg?react';
import SendIcon from '@/shared/assets/icons/send.svg?react';
import { useDialog } from '@/shared/hooks/useDialog';
import type {
  MessageType,
  ChatFileInfo,
  FileType,
} from '@/entities/chat/model/Chat';

interface ChatInputProps {
  messageText: string;
  isConnected: boolean;
  selectedChatId: number | null;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onFileMessage: (
    files: ChatFileInfo[],
    messageType: MessageType,
    message: string,
  ) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const FILE_SIZE_LIMIT = 10 * 1024 * 1024;
const MAX_FILE_COUNT = 10;

const ALLOWED_FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
  DOCUMENT: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
    'text/plain',
  ],
};

interface SelectedFile {
  file: File;
  previewUrl: string | null;
}

const isFileSizeValid = (file: File): boolean => file.size <= FILE_SIZE_LIMIT;

const getFileType = (file: File): FileType => {
  if (ALLOWED_FILE_TYPES.IMAGE.includes(file.type)) {
    return 'IMAGE';
  }
  return 'FILE';
};

const getMessageTypeFromFiles = (files: File[]): MessageType => {
  const hasImage = files.some((f) => ALLOWED_FILE_TYPES.IMAGE.includes(f.type));
  const hasDocument = files.some((f) =>
    ALLOWED_FILE_TYPES.DOCUMENT.includes(f.type),
  );

  if (hasImage && !hasDocument) return 'IMAGE';
  if (hasDocument && !hasImage) return 'FILE';
  return 'FILE';
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const ChatInput: React.FC<ChatInputProps> = ({
  messageText,
  isConnected,
  selectedChatId,
  onMessageChange,
  onSendMessage,
  onFileMessage,
  onKeyDown,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const { alert } = useDialog();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onMessageChange(e.target.value);

    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const totalCount = selectedFiles.length + files.length;
    if (totalCount > MAX_FILE_COUNT) {
      alert({
        title: '파일 첨부 오류',
        content: `파일은 최대 ${MAX_FILE_COUNT}개까지 선택할 수 있습니다.`,
      });
      e.target.value = '';
      return;
    }

    const oversizedFiles: string[] = [];
    const validFiles: SelectedFile[] = [];

    files.forEach((file) => {
      if (!isFileSizeValid(file)) {
        oversizedFiles.push(file.name);
      } else {
        const previewUrl = ALLOWED_FILE_TYPES.IMAGE.includes(file.type)
          ? URL.createObjectURL(file)
          : null;
        validFiles.push({ file, previewUrl });
      }
    });

    if (oversizedFiles.length > 0) {
      alert({
        title: '파일 첨부 오류',
        content: `파일 크기는 10MB를 초과할 수 없습니다. (${oversizedFiles.join(', ')})`,
      });
    }

    if (validFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
    }

    e.target.value = '';
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => {
      const fileToRemove = prev[index];
      if (fileToRemove.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const clearAllFiles = () => {
    selectedFiles.forEach((f) => {
      if (f.previewUrl) {
        URL.revokeObjectURL(f.previewUrl);
      }
    });
    setSelectedFiles([]);
  };

  const handleSendWithFiles = async () => {
    if (selectedFiles.length === 0 || !selectedChatId) return;

    setUploadProgress(0);

    try {
      const files = selectedFiles.map((sf) => sf.file);
      const response = await uploadChatFiles(selectedChatId, files);

      if (response.data.content && response.data.content.length > 0) {
        const uploadedFiles: ChatFileInfo[] = response.data.content.map(
          (uploadedFile, index) => ({
            fileUrl: uploadedFile.fileUrl,
            fileName: uploadedFile.fileName,
            fileSize: uploadedFile.fileSize,
            fileType: getFileType(files[index]),
          }),
        );

        const messageType = getMessageTypeFromFiles(files);
        onFileMessage(uploadedFiles, messageType, '');

        clearAllFiles();
        onMessageChange('');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '파일 업로드에 실패했습니다.';
      alert({
        title: '파일 업로드 오류',
        content: errorMessage,
      });
    } finally {
      setUploadProgress(null);
    }
  };

  const handleSend = () => {
    if (selectedFiles.length > 0) {
      handleSendWithFiles();
    } else {
      onSendMessage();
    }
  };

  const isDisabled = !isConnected || uploadProgress !== null;
  const canSend =
    (messageText.trim() || selectedFiles.length > 0) &&
    isConnected &&
    !uploadProgress;

  const isImage = (file: File) => ALLOWED_FILE_TYPES.IMAGE.includes(file.type);

  return (
    <S.Container>
      {selectedFiles.length > 0 && (
        <S.FilePreviewContainer>
          <S.FilePreviewHeader>
            <S.FileCount>{selectedFiles.length}개 파일 선택됨</S.FileCount>
            <S.ClearAllButton onClick={clearAllFiles}>
              전체 삭제
            </S.ClearAllButton>
          </S.FilePreviewHeader>
          <S.FilePreviewList>
            {selectedFiles.map((selectedFile, index) => (
              <S.FilePreviewItem
                key={`${selectedFile.file.name}-${selectedFile.file.lastModified}`}
              >
                {isImage(selectedFile.file) && selectedFile.previewUrl ? (
                  <S.FilePreviewImage
                    src={selectedFile.previewUrl}
                    alt={selectedFile.file.name}
                  />
                ) : (
                  <S.FilePreviewIcon>
                    <FileIcon />
                  </S.FilePreviewIcon>
                )}
                <S.FileInfo>
                  <S.FileName>{selectedFile.file.name}</S.FileName>
                  <S.FileSize>
                    {formatFileSize(selectedFile.file.size)}
                  </S.FileSize>
                </S.FileInfo>
                <S.RemoveFileButton onClick={() => handleRemoveFile(index)}>
                  <CrossIcon width={16} height={16} />
                </S.RemoveFileButton>
              </S.FilePreviewItem>
            ))}
          </S.FilePreviewList>
        </S.FilePreviewContainer>
      )}

      <S.InputRow>
        <S.AttachButton
          onClick={() => imageInputRef.current?.click()}
          disabled={isDisabled}
          title="사진 첨부"
        >
          <PictureIcon />
        </S.AttachButton>
        <S.AttachButton
          onClick={() => fileInputRef.current?.click()}
          disabled={isDisabled}
          title="파일 첨부"
        >
          <AttachmentIcon />
        </S.AttachButton>
        <S.HiddenFileInput
          ref={imageInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.gif"
          multiple
          onChange={handleFileSelect}
        />
        <S.HiddenFileInput
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.txt"
          multiple
          onChange={handleFileSelect}
        />
        <S.InputWrapper>
          <S.ChatTextarea
            ref={inputRef}
            placeholder="메시지를 입력하세요."
            value={messageText}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            rows={1}
            disabled={isDisabled}
          />
        </S.InputWrapper>
        <S.SendButton onClick={handleSend} disabled={!canSend}>
          <SendIcon />
        </S.SendButton>
      </S.InputRow>
    </S.Container>
  );
};

export default ChatInput;
