import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '@/features/chat/ui/Messages/Messages.styles';
import DownloadIcon from '@/shared/assets/icons/download.svg?react';
import UserProfileImageIcon from '@/shared/assets/icons/user-profile-image.svg?react';
import { formatTime, formatPrice } from '@/shared/lib';
import Button from '@/shared/ui/Button';
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

const PaymentRequest: React.FC<{
  message: Message;
  onPayment?: (orderId: number, price: number) => void;
  isPaymentProcessing?: boolean;
}> = ({ message, onPayment, isPaymentProcessing }) => {
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

  return (
    <S.OrderCard>
      <S.OrderCardContent>
        <S.OrderCardTitle>결제 요청</S.OrderCardTitle>
        <S.OrderCardAmount>{formatPrice(price)}원</S.OrderCardAmount>
        {!isOwn && (
          <Button
            onClick={() => onPayment && orderId && onPayment(orderId, price)}
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

const RequestForm: React.FC<{
  message: Message;
  content: OrderMessageContent;
  onRequestPayment?: (orderId: number) => void;
  isRequestPaymentProcessing?: boolean;
  onViewOrderDetail?: (orderId: number) => void;
}> = ({
  message,
  content,
  onRequestPayment,
  isRequestPaymentProcessing,
  onViewOrderDetail,
}) => (
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
        <Button
          onClick={() =>
            onViewOrderDetail && onViewOrderDetail(content.orderId!)
          }
          fullWidth
        >
          의뢰 내용 확인
        </Button>
      )}
      {!message.isOwn && content.orderId && (
        <Button
          onClick={() => onRequestPayment && onRequestPayment(content.orderId!)}
          disabled={isRequestPaymentProcessing}
          fullWidth
        >
          결제 요청
        </Button>
      )}
    </S.OrderCardContent>
  </S.OrderCard>
);

const PaymentCompleted: React.FC<{
  message: Message;
  content: OrderMessageContent;
  onConfirmOrder?: (orderId: number) => void;
  isConfirmProcessing?: boolean;
}> = ({ message, content, onConfirmOrder, isConfirmProcessing }) => (
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
        {content.serviceName} 결제가 완료되었습니다. 전문가가 작업을 시작합니다.
      </S.OrderCardDescription>
      {!message.isOwn && content.orderId && (
        <Button
          onClick={() => onConfirmOrder && onConfirmOrder(content.orderId!)}
          disabled={isConfirmProcessing}
          fullWidth
        >
          구매 확정하기
        </Button>
      )}
    </S.OrderCardContent>
  </S.OrderCard>
);

const OrderCancelled: React.FC<{ content: OrderMessageContent }> = ({
  content,
}) => (
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

const WorkCompleted: React.FC<{
  message: Message;
  content: OrderMessageContent;
  onConfirmOrder?: (orderId: number) => void;
  isConfirmProcessing?: boolean;
}> = ({ message, content, onConfirmOrder, isConfirmProcessing }) => (
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
        {content.serviceName} 작업이 완료되었습니다. 결과물을 확인하시고 구매를
        확정해주세요.
      </S.OrderCardDescription>
      {!message.isOwn && content.orderId && (
        <Button
          onClick={() => onConfirmOrder && onConfirmOrder(content.orderId!)}
          disabled={isConfirmProcessing}
          fullWidth
        >
          구매 확정하기
        </Button>
      )}
    </S.OrderCardContent>
  </S.OrderCard>
);

const WorkConfirmed: React.FC<{ content: OrderMessageContent }> = ({
  content,
}) => (
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

const ServiceInquiry: React.FC<{ content: OrderMessageContent }> = ({
  content,
}) => {
  const navigate = useNavigate();
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

const SingleImage: React.FC<{
  fileUrl: string;
  fileName: string;
}> = ({ fileUrl, fileName }) => (
  <S.ImageMessage
    src={fileUrl}
    alt={fileName || 'image'}
    onClick={() => window.open(fileUrl, '_blank')}
  />
);

const ImageGrid: React.FC<{ files: ChatFileInfo[] }> = ({ files }) => (
  <S.ImageGrid count={files.length}>
    {files.map((file) => (
      <S.ImageGridItemWrapper
        key={file.fileUrl}
        onClick={() => window.open(file.fileUrl, '_blank')}
      >
        <S.ImageGridItem src={file.fileUrl} alt={file.fileName || 'image'} />
      </S.ImageGridItemWrapper>
    ))}
  </S.ImageGrid>
);

const SingleFile: React.FC<{
  fileUrl: string;
  fileName: string;
  fileSize: number;
}> = ({ fileUrl, fileName, fileSize }) => (
  <S.FileMessage onClick={() => window.open(fileUrl, '_blank')}>
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

const FileList: React.FC<{ files: ChatFileInfo[] }> = ({ files }) => (
  <S.FileList>
    {files.map((file) => (
      <SingleFile
        key={file.fileUrl}
        fileUrl={file.fileUrl}
        fileName={file.fileName}
        fileSize={file.fileSize}
      />
    ))}
  </S.FileList>
);

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

  const renderMessageContent = () => {
    const messageType = message.messageType || 'TEXT';
    const { files } = message;

    switch (messageType) {
      case 'TEXT':
        return message.text;

      case 'REQUEST_PAYMENT':
        return (
          <PaymentRequest
            message={message}
            onPayment={onPayment}
            isPaymentProcessing={isPaymentProcessing}
          />
        );

      case 'REQUEST_FORM': {
        const content = parseOrderContent();
        if (!content) return message.text;
        return (
          <RequestForm
            message={message}
            content={content}
            onRequestPayment={onRequestPayment}
            isRequestPaymentProcessing={isRequestPaymentProcessing}
            onViewOrderDetail={onViewOrderDetail}
          />
        );
      }

      case 'PAYMENT_COMPLETED': {
        const content = parseOrderContent();
        if (!content) return message.text;
        return (
          <PaymentCompleted
            message={message}
            content={content}
            onConfirmOrder={onConfirmOrder}
            isConfirmProcessing={isConfirmProcessing}
          />
        );
      }

      case 'ORDER_CANCELLED': {
        const content = parseOrderContent();
        if (!content) return message.text;
        return <OrderCancelled content={content} />;
      }

      case 'WORK_COMPLETED': {
        const content = parseOrderContent();
        if (!content) return message.text;
        return (
          <WorkCompleted
            message={message}
            content={content}
            onConfirmOrder={onConfirmOrder}
            isConfirmProcessing={isConfirmProcessing}
          />
        );
      }

      case 'WORK_CONFIRMED': {
        const content = parseOrderContent();
        if (!content) return message.text;
        return <WorkConfirmed content={content} />;
      }

      case 'SERVICE_INQUIRY': {
        const content = parseOrderContent();
        if (!content) return message.text;
        return <ServiceInquiry content={content} />;
      }

      case 'IMAGE':
        if (files && files.length > 0) {
          if (files.length === 1) {
            return (
              <SingleImage
                fileUrl={files[0].fileUrl}
                fileName={files[0].fileName}
              />
            );
          }
          return <ImageGrid files={files} />;
        }
        return message.text;

      case 'FILE':
        if (files && files.length > 0) {
          if (files.length === 1) {
            return (
              <SingleFile
                fileUrl={files[0].fileUrl}
                fileName={files[0].fileName}
                fileSize={files[0].fileSize}
              />
            );
          }
          return <FileList files={files} />;
        }
        return message.text;

      default:
        return message.text;
    }
  };

  return (
    <S.MessageGroup
      isOwn={message.isOwn}
      style={{ marginTop: isNewMessageGroup ? '12px' : '4px' }}
    >
      <S.MessageRow isOwn={message.isOwn}>
        {!message.isOwn && (
          <S.SenderProfileContainer
            style={{ visibility: shouldShowProfile ? 'visible' : 'hidden' }}
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
