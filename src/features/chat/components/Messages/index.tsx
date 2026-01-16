import React from 'react';
import * as S from '@/features/chat/components/Messages/Messages.styles';
import DownloadIcon from '@/shared/assets/icons/download.svg?react';
import UserProfileImageIcon from '@/shared/assets/icons/user-profile-image.svg?react';
import { formatTime } from '@/shared/utils';
import type {
  Message,
  ChatRoom,
  ChatFileInfo,
} from '@/features/chat/types/Chat';

interface MessageProps {
  message: Message;
  position: 'single' | 'first' | 'middle' | 'last';
  shouldShowTime: boolean;
  shouldShowProfile: boolean;
  isNewMessageGroup: boolean;
  selectedChat: ChatRoom;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const Messages: React.FC<MessageProps> = ({
  message,
  position,
  shouldShowTime,
  shouldShowProfile,
  isNewMessageGroup,
  selectedChat,
}) => {
  const renderSingleImage = (
    fileUrl: string,
    fileName: string,
    index?: number,
  ) => (
    <S.ImageMessage
      key={index}
      src={fileUrl}
      alt={fileName || 'image'}
      onClick={() => window.open(fileUrl, '_blank')}
    />
  );

  const renderSingleFile = (
    fileUrl: string,
    fileName: string,
    fileSize: number,
    index?: number,
  ) => (
    <S.FileMessage key={index} onClick={() => window.open(fileUrl, '_blank')}>
      <S.FileDetails>
        <S.FileNameText>{fileName}</S.FileNameText>
        <S.FileSizeText>
          {fileSize ? formatFileSize(fileSize) : ''}
        </S.FileSizeText>
      </S.FileDetails>
      <S.DownloadButton>
        <DownloadIcon />
      </S.DownloadButton>
    </S.FileMessage>
  );

  const renderMultipleImages = (files: ChatFileInfo[]) => {
    const imageCount = files.length;

    return (
      <S.ImageGrid count={imageCount}>
        {files.map((file) => (
          <S.ImageGridItemWrapper
            key={file.fileUrl}
            onClick={() => window.open(file.fileUrl, '_blank')}
          >
            <S.ImageGridItem
              src={file.fileUrl}
              alt={file.fileName || 'image'}
            />
          </S.ImageGridItemWrapper>
        ))}
      </S.ImageGrid>
    );
  };

  const renderMultipleFiles = (files: ChatFileInfo[]) => (
    <S.FileList>
      {files.map((file, index) =>
        renderSingleFile(file.fileUrl, file.fileName, file.fileSize, index),
      )}
    </S.FileList>
  );

  const renderMessageContent = () => {
    const messageType = message.messageType || 'TEXT';
    const { files } = message;

    if (messageType === 'TEXT') {
      return message.text;
    }

    if (files && files.length > 0) {
      if (messageType === 'IMAGE') {
        if (files.length === 1) {
          return renderSingleImage(files[0].fileUrl, files[0].fileName);
        }
        return renderMultipleImages(files);
      }

      if (messageType === 'FILE') {
        if (files.length === 1) {
          return renderSingleFile(
            files[0].fileUrl,
            files[0].fileName,
            files[0].fileSize,
          );
        }
        return renderMultipleFiles(files);
      }
    }

    return message.text;
  };

  return (
    <S.MessageGroup
      isOwn={message.isOwn}
      style={{
        marginTop: isNewMessageGroup ? '12px' : '4px',
      }}
    >
      <S.MessageRow isOwn={message.isOwn}>
        {!message.isOwn && (
          <S.SenderProfileContainer
            style={{
              visibility: shouldShowProfile ? 'visible' : 'hidden',
            }}
          >
            {selectedChat.profileUrl ? (
              <S.SenderProfileImage
                src={selectedChat.profileUrl}
                alt="profile"
              />
            ) : (
              <UserProfileImageIcon width={32} height={32} />
            )}
          </S.SenderProfileContainer>
        )}
        {message.isOwn && shouldShowTime && (
          <S.MessageTimestamp isOwn={message.isOwn}>
            {formatTime(message.timestamp)}
          </S.MessageTimestamp>
        )}
        <S.MessageBubble
          isOwn={message.isOwn}
          status={message.status}
          position={position}
          messageType={message.messageType}
        >
          {renderMessageContent()}
        </S.MessageBubble>
        {!message.isOwn && shouldShowTime && (
          <S.MessageTimestamp isOwn={message.isOwn}>
            {formatTime(message.timestamp)}
          </S.MessageTimestamp>
        )}
      </S.MessageRow>
    </S.MessageGroup>
  );
};

export default Messages;
