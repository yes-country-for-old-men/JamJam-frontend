import React from 'react';
import Modal from '@/shared/ui/Modal';
import * as S from './OrderDetailModal.styles';
import type { OrderDetailContent } from '@/entities/order/api/orderApi';

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetail: OrderDetailContent | null;
}

const formatDeadline = (deadline: string) => {
  const date = new Date(deadline);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  isOpen,
  onClose,
  orderDetail,
}) => {
  if (!orderDetail) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="주문 상세">
      <S.Container>
        <S.Section>
          <S.Label>제목</S.Label>
          <S.Value>{orderDetail.title}</S.Value>
        </S.Section>
        <S.Section>
          <S.Label>희망 마감일</S.Label>
          <S.Value>{formatDeadline(orderDetail.deadline)}</S.Value>
        </S.Section>
        <S.Section>
          <S.Label>요청 내용</S.Label>
          <S.Value>{orderDetail.description}</S.Value>
        </S.Section>
        {orderDetail.referenceFiles.length > 0 && (
          <S.Section>
            <S.Label>참고 자료</S.Label>
            <S.ImageGrid>
              {orderDetail.referenceFiles.map((file) => (
                <S.ImageWrapper
                  key={file.id}
                  onClick={() => window.open(file.url, '_blank')}
                >
                  <S.Image src={file.url} alt="참고 자료" />
                </S.ImageWrapper>
              ))}
            </S.ImageGrid>
          </S.Section>
        )}
        {orderDetail.cancelReason && (
          <S.Section>
            <S.Label>취소 사유</S.Label>
            <S.Value>{orderDetail.cancelReason}</S.Value>
          </S.Section>
        )}
      </S.Container>
    </Modal>
  );
};

export default OrderDetailModal;
