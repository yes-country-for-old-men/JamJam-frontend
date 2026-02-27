import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderDetailModal from '@/features/chat/components/OrderDetailModal';
import CancelReasonModal from '@/features/order/components/CancelReasonModal';
import { useCancelOrderMutation } from '@/features/order/hooks/mutations/useCancelOrderMutation';
import { useConfirmOrderMutation } from '@/features/order/hooks/mutations/useConfirmOrderMutation';
import { useOrderDetailQuery } from '@/features/order/hooks/queries/useOrderDetailQuery';
import { getStatusLabel } from '@/features/order/utils/orderFormatters';
import LogoIcon from '@/shared/assets/icons/gray-logo-icon.svg?react';
import Button from '@/shared/components/Button';
import { formatDate, formatPrice } from '@/shared/utils';
import * as S from './OrderHistoryList.styles';
import type {
  MyOrderListContent,
  MyOrderListItem,
} from '@/features/order/api/orderApi';

interface OrderHistoryListProps {
  orderList?: MyOrderListContent;
}

const OrderHistoryList: React.FC<OrderHistoryListProps> = ({ orderList }) => {
  const navigate = useNavigate();
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [cancelTargetOrderId, setCancelTargetOrderId] = useState<number | null>(
    null,
  );

  const { data: orderDetail } = useOrderDetailQuery(selectedOrderId);
  const confirmMutation = useConfirmOrderMutation();
  const cancelMutation = useCancelOrderMutation();

  const handleConfirmOrder = (orderId: number) => {
    confirmMutation.mutate(orderId);
  };

  const handleCancelSubmit = (reason: string) => {
    if (cancelTargetOrderId === null) return;
    cancelMutation.mutate(
      { orderId: cancelTargetOrderId, cancelReason: reason },
      { onSuccess: () => setCancelTargetOrderId(null) },
    );
  };

  const handleViewOrderDetail = (orderId: number) => {
    setSelectedOrderId(orderId);
  };

  const handleServiceClick = (serviceId: number) => {
    navigate(`/services/${serviceId}`);
  };

  const renderActionButtons = (order: MyOrderListItem) => {
    const isLoading =
      (confirmMutation.isPending &&
        confirmMutation.variables === order.orderId) ||
      (cancelMutation.isPending &&
        cancelMutation.variables?.orderId === order.orderId);

    switch (order.orderStatus) {
      case 'REQUESTED':
        return (
          <>
            <Button
              size="small"
              onClick={() => handleViewOrderDetail(order.orderId)}
            >
              주문 상세
            </Button>
            <Button
              size="small"
              variant="outline"
              disabled={isLoading}
              onClick={() => setCancelTargetOrderId(order.orderId)}
            >
              주문 취소
            </Button>
          </>
        );
      case 'PREPARING':
        return (
          <Button
            size="small"
            onClick={() => handleViewOrderDetail(order.orderId)}
          >
            주문 상세
          </Button>
        );
      case 'WAITING_CONFIRM':
        return (
          <>
            <Button
              size="small"
              onClick={() => handleViewOrderDetail(order.orderId)}
            >
              주문 상세
            </Button>
            <Button
              size="small"
              variant="primary"
              disabled={isLoading}
              onClick={() => handleConfirmOrder(order.orderId)}
            >
              완료 확인
            </Button>
          </>
        );
      case 'COMPLETED':
      case 'CANCELLED':
        return (
          <Button
            size="small"
            onClick={() => handleViewOrderDetail(order.orderId)}
          >
            주문 상세
          </Button>
        );
      default:
        return null;
    }
  };

  if (!orderList?.orders.length) {
    return (
      <S.EmptyState>
        <LogoIcon />
        <S.EmptyStateText>주문 내역이 없습니다.</S.EmptyStateText>
      </S.EmptyState>
    );
  }

  return (
    <S.Container>
      {orderList.orders.map((order) => (
        <S.OrderCard key={order.orderId}>
          <S.OrderHeader>
            <S.OrderDate>{formatDate(new Date(order.orderedAt))}</S.OrderDate>
            <S.StatusBadge status={order.orderStatus}>
              {getStatusLabel(order.orderStatus)}
            </S.StatusBadge>
          </S.OrderHeader>
          <S.OrderBody>
            {order.thumbnailUrl ? (
              <S.Thumbnail
                src={order.thumbnailUrl}
                alt={order.serviceName}
                onClick={() => handleServiceClick(order.serviceId)}
              />
            ) : (
              <S.ThumbnailPlaceholder
                onClick={() => handleServiceClick(order.serviceId)}
              >
                <LogoIcon />
              </S.ThumbnailPlaceholder>
            )}
            <S.OrderContent>
              <S.ServiceName
                onClick={() => handleServiceClick(order.serviceId)}
              >
                {order.serviceName}
              </S.ServiceName>
              <S.OrderTitle>{order.title}</S.OrderTitle>
              {order.price != null && (
                <S.PriceRow>
                  <S.PriceLabel>결제 금액</S.PriceLabel>
                  <S.Price>{formatPrice(order.price)}원</S.Price>
                </S.PriceRow>
              )}
            </S.OrderContent>
            <S.OrderActions>{renderActionButtons(order)}</S.OrderActions>
          </S.OrderBody>
        </S.OrderCard>
      ))}
      <OrderDetailModal
        isOpen={selectedOrderId !== null}
        onClose={() => setSelectedOrderId(null)}
        orderDetail={orderDetail ?? null}
      />
      <CancelReasonModal
        isOpen={cancelTargetOrderId !== null}
        onClose={() => setCancelTargetOrderId(null)}
        onSubmit={handleCancelSubmit}
        userRole="client"
      />
    </S.Container>
  );
};

export default OrderHistoryList;
