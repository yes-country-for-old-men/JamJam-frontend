import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '@/features/chat/ui/Messages/Messages.styles';
import DownloadIcon from '@/shared/assets/icons/download.svg?react';
import UserProfileImageIcon from '@/shared/assets/icons/user-profile-image.svg?react';
import Button from '@/shared/components/Button';
import { formatTime, formatPrice } from '@/shared/utils';
import type {
  Message,
  ChatRoom,
  ChatFileInfo,
  OrderMessageContent,
} from '@/entities/chat/model/Chat';

interface MessageProps {
  message: Message;
  position: 'single' | 'first' | 'middle' | 'last';
  shouldShowTime: boolean;
  shouldShowProfile: boolean;
  isNewMessageGroup: boolean;
  selectedChat: ChatRoom;
  onPayment?: (orderId: number, price: number) => void;
  isPaymentProcessing?: boolean;
  onConfirmOrder?: (orderId: number) => void;
  isConfirmProcessing?: boolean;
  onRequestPayment?: (orderId: number) => void;
  isRequestPaymentProcessing?: boolean;
  onViewOrderDetail?: (orderId: number) => void;
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
  onPayment,
  isPaymentProcessing,
  onConfirmOrder,
  isConfirmProcessing,
  onRequestPayment,
  isRequestPaymentProcessing,
  onViewOrderDetail,
}) => {
  const navigate = useNavigate();

  const parseOrderContent = (): OrderMessageContent | null => {
    if (message.orderContent) return message.orderContent;

    try {
      const parsed = JSON.parse(message.text);
      if (parsed.serviceId && parsed.serviceName) {
        return parsed as OrderMessageContent;
      }
    } catch {
      return null;
    }

    return null;
  };
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

  const renderPaymentRequest = () => {
    const { isOwn, orderId: messageOrderId } = message;
    let orderId = messageOrderId;
    let price = 0;

    try {
      const parsed = JSON.parse(message.text);
      orderId = parsed.orderId ?? orderId;
      price = parsed.price ?? 0;
    } catch {
      price = parseInt(message.text, 10) || 0;
    }

    const handlePaymentClick = () => {
      if (onPayment && orderId) {
        onPayment(orderId, price);
      }
    };

    return (
      <S.OrderCard>
        <S.OrderCardContent>
          <S.OrderCardTitle>결제 요청</S.OrderCardTitle>
          <S.OrderCardAmount>{formatPrice(price)}원</S.OrderCardAmount>
          {!isOwn && (
            <Button
              onClick={handlePaymentClick}
              disabled={isPaymentProcessing || !orderId}
              fullWidth
            >
              결제하기
            </Button>
          )}
        </S.OrderCardContent>
      </S.OrderCard>
    );
  };

  const renderRequestForm = () => {
    const content = parseOrderContent();
    if (!content) return message.text;

    const handleRequestPaymentClick = () => {
      if (onRequestPayment && content.orderId) {
        onRequestPayment(content.orderId);
      }
    };

    const handleViewOrderDetail = () => {
      if (onViewOrderDetail && content.orderId) {
        onViewOrderDetail(content.orderId);
      }
    };

    return (
      <S.OrderCard>
        {content.serviceThumbnail && (
          <S.OrderCardThumbnail
            src={content.serviceThumbnail}
            alt={content.serviceName}
          />
        )}
        <S.OrderCardContent>
          <S.OrderCardTitle>서비스 의뢰</S.OrderCardTitle>
          <S.OrderCardDescription>
            {content.serviceName} 서비스 의뢰가 접수되었습니다. 전문가의 확인을
            기다려주세요.
          </S.OrderCardDescription>
          {content.orderId && (
            <Button onClick={handleViewOrderDetail} fullWidth>
              의뢰 내용 확인
            </Button>
          )}
          {!message.isOwn && content.orderId && (
            <Button
              onClick={handleRequestPaymentClick}
              disabled={isRequestPaymentProcessing}
              fullWidth
            >
              결제 요청
            </Button>
          )}
        </S.OrderCardContent>
      </S.OrderCard>
    );
  };

  const renderPaymentCompleted = () => {
    const content = parseOrderContent();
    if (!content) return message.text;

    const handleConfirmClick = () => {
      if (onConfirmOrder && content.orderId) {
        onConfirmOrder(content.orderId);
      }
    };

    return (
      <S.OrderCard>
        {content.serviceThumbnail && (
          <S.OrderCardThumbnail
            src={content.serviceThumbnail}
            alt={content.serviceName}
          />
        )}
        <S.OrderCardContent>
          <S.OrderCardTitle>결제 완료</S.OrderCardTitle>
          <S.OrderCardDescription>
            {content.serviceName} 결제가 완료되었습니다. 전문가가 작업을
            시작합니다.
          </S.OrderCardDescription>
          {!message.isOwn && content.orderId && (
            <Button
              onClick={handleConfirmClick}
              disabled={isConfirmProcessing}
              fullWidth
            >
              구매 확정하기
            </Button>
          )}
        </S.OrderCardContent>
      </S.OrderCard>
    );
  };

  const renderOrderCancelled = () => {
    const content = parseOrderContent();
    if (!content) return message.text;

    return (
      <S.OrderCard>
        {content.serviceThumbnail && (
          <S.OrderCardThumbnail
            src={content.serviceThumbnail}
            alt={content.serviceName}
          />
        )}
        <S.OrderCardContent>
          <S.OrderCardTitle>주문 취소</S.OrderCardTitle>
          <S.OrderCardDescription>
            {content.serviceName} 주문이 취소되었습니다.
          </S.OrderCardDescription>
        </S.OrderCardContent>
      </S.OrderCard>
    );
  };

  const renderWorkCompleted = () => {
    const content = parseOrderContent();
    if (!content) return message.text;

    const handleConfirmClick = () => {
      if (onConfirmOrder && content.orderId) {
        onConfirmOrder(content.orderId);
      }
    };

    return (
      <S.OrderCard>
        {content.serviceThumbnail && (
          <S.OrderCardThumbnail
            src={content.serviceThumbnail}
            alt={content.serviceName}
          />
        )}
        <S.OrderCardContent>
          <S.OrderCardTitle>작업 완료</S.OrderCardTitle>
          <S.OrderCardDescription>
            {content.serviceName} 작업이 완료되었습니다. 결과물을 확인하시고
            구매를 확정해주세요.
          </S.OrderCardDescription>
          {!message.isOwn && content.orderId && (
            <Button
              onClick={handleConfirmClick}
              disabled={isConfirmProcessing}
              fullWidth
            >
              구매 확정하기
            </Button>
          )}
        </S.OrderCardContent>
      </S.OrderCard>
    );
  };

  const renderWorkConfirmed = () => {
    const content = parseOrderContent();
    if (!content) return message.text;

    return (
      <S.OrderCard>
        {content.serviceThumbnail && (
          <S.OrderCardThumbnail
            src={content.serviceThumbnail}
            alt={content.serviceName}
          />
        )}
        <S.OrderCardContent>
          <S.OrderCardTitle>구매 확정</S.OrderCardTitle>
          <S.OrderCardDescription>
            {content.serviceName} 구매가 확정되었습니다. 거래가 완료되었습니다.
          </S.OrderCardDescription>
        </S.OrderCardContent>
      </S.OrderCard>
    );
  };

  const renderServiceInquiry = () => {
    const content = parseOrderContent();
    if (!content) return message.text;

    return (
      <S.OrderCard>
        <S.OrderCardContent>
          <S.OrderCardTitle>서비스 문의</S.OrderCardTitle>
          <S.OrderCardDescription>
            {content.serviceName} 서비스에 대한 문의가 시작되었습니다.
          </S.OrderCardDescription>
          <Button
            onClick={() => navigate(`/service/${content.serviceId}`)}
            fullWidth
          >
            서비스 상세보기
          </Button>
        </S.OrderCardContent>
      </S.OrderCard>
    );
  };

  const renderMessageContent = () => {
    const messageType = message.messageType || 'TEXT';
    const { files } = message;

    switch (messageType) {
      case 'TEXT':
        return message.text;

      case 'REQUEST_PAYMENT':
        return renderPaymentRequest();

      case 'REQUEST_FORM':
        return renderRequestForm();

      case 'PAYMENT_COMPLETED':
        return renderPaymentCompleted();

      case 'ORDER_CANCELLED':
        return renderOrderCancelled();

      case 'WORK_COMPLETED':
        return renderWorkCompleted();

      case 'WORK_CONFIRMED':
        return renderWorkConfirmed();

      case 'SERVICE_INQUIRY':
        return renderServiceInquiry();

      case 'IMAGE':
        if (files && files.length > 0) {
          if (files.length === 1) {
            return renderSingleImage(files[0].fileUrl, files[0].fileName);
          }
          return renderMultipleImages(files);
        }
        return message.text;

      case 'FILE':
        if (files && files.length > 0) {
          if (files.length === 1) {
            return renderSingleFile(
              files[0].fileUrl,
              files[0].fileName,
              files[0].fileSize,
            );
          }
          return renderMultipleFiles(files);
        }
        return message.text;

      default:
        return message.text;
    }
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
