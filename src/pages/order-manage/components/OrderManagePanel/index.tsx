import React, { useState } from 'react';
import {
  type OrderStatus,
  type OrderCountContent,
} from '@/entities/order/api/orderApi';
import { useOrderDetailQuery } from '@/entities/order/model/useOrderDetailQuery';
import { useOrderListQuery } from '@/entities/order/model/useOrderListQuery';
import { ORDER_TABS } from '@/features/order/config/orderTabs';
import {
  formatOrderDate,
  formatDeadline,
} from '@/features/order/lib/orderFormatters';
import { useChangeOrderStatusMutation } from '@/features/order/model/mutations/useChangeOrderStatusMutation';
import CancelReasonModal from '@/features/order/ui/CancelReasonModal';
import LogoIcon from '@/shared/assets/icons/gray-logo-icon.svg?react';
import Button from '@/shared/ui/Button';
import * as S from './OrderManagePanel.styles';

interface OrderManagePanelProps {
  statusData?: OrderCountContent | null;
}

const OrderManagePanel: React.FC<OrderManagePanelProps> = ({ statusData }) => {
  const [activeTab, setActiveTab] = useState<OrderStatus>('REQUESTED');
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [cancelTargetOrderId, setCancelTargetOrderId] = useState<number | null>(
    null,
  );

  const { data: orderList, isLoading: loading } = useOrderListQuery(activeTab);
  const { data: orderDetail, isLoading: detailLoading } =
    useOrderDetailQuery(selectedOrderId);
  const changeStatusMutation = useChangeOrderStatusMutation();

  const getTabCount = (tabId: OrderStatus) => {
    if (!statusData) return null;

    switch (tabId) {
      case 'REQUESTED':
        return statusData.requested;
      case 'PREPARING':
        return statusData.preparing;
      case 'WAITING_CONFIRM':
        return statusData.waitingConfirm;
      case 'COMPLETED':
        return statusData.completed;
      case 'CANCELLED':
        return statusData.cancelled;
      default:
        return null;
    }
  };

  const handleStatusChange = (
    orderId: number,
    newStatus: OrderStatus,
    cancelReason?: string,
  ) => {
    changeStatusMutation.mutate({
      orderId,
      orderStatus: newStatus,
      cancelReason,
    });
  };

  const handleCancelSubmit = (reason: string) => {
    if (cancelTargetOrderId === null) return;
    handleStatusChange(cancelTargetOrderId, 'CANCELLED', reason);
    setCancelTargetOrderId(null);
  };

  const getButtons = (status: OrderStatus, orderId: number) => {
    const actionLoading = changeStatusMutation.isPending;

    switch (status) {
      case 'REQUESTED':
        return (
          <>
            <Button
              size="large"
              variant="outline"
              disabled={actionLoading}
              onClick={() => setCancelTargetOrderId(orderId)}
            >
              거절하기
            </Button>
            <Button
              size="large"
              variant="primary"
              disabled={actionLoading}
              onClick={() => handleStatusChange(orderId, 'PREPARING')}
            >
              수락하기
            </Button>
          </>
        );
      case 'PREPARING':
        return (
          <>
            <Button
              size="large"
              variant="outline"
              disabled={actionLoading}
              onClick={() => setCancelTargetOrderId(orderId)}
            >
              취소하기
            </Button>
            <Button
              size="large"
              variant="primary"
              disabled={actionLoading}
              onClick={() => handleStatusChange(orderId, 'WAITING_CONFIRM')}
            >
              완료하기
            </Button>
          </>
        );
      case 'WAITING_CONFIRM':
        return (
          <Button
            size="large"
            variant="outline"
            disabled={actionLoading}
            onClick={() => setCancelTargetOrderId(orderId)}
          >
            취소하기
          </Button>
        );
      case 'COMPLETED':
      case 'CANCELLED':
        return null;
      default:
        return null;
    }
  };

  return (
    <S.Container>
      <S.TabContainer>
        {ORDER_TABS.map((tab) => {
          const count = getTabCount(tab.id);
          return (
            <S.Tab
              key={tab.id}
              isActive={activeTab === tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedOrderId(null);
              }}
            >
              {tab.label}
              {tab.id === 'REQUESTED' && count !== null && count > 0 && (
                <S.TabBadge>{count}</S.TabBadge>
              )}
            </S.Tab>
          );
        })}
      </S.TabContainer>
      <S.ContentArea>
        <S.Sidebar>
          {loading ? (
            <S.LoadingWrapper />
          ) : (
            <S.OrderList>
              {orderList?.orders.map((order) => (
                <S.OrderItem
                  key={order.orderId}
                  isSelected={selectedOrderId === order.orderId}
                  onClick={() => setSelectedOrderId(order.orderId)}
                >
                  <S.OrderTitle>{order.title}</S.OrderTitle>
                  <S.OrderInfo>
                    <S.OrderClient>{order.client}</S.OrderClient>
                    <S.OrderDate>
                      {formatOrderDate(order.orderedAt)}
                    </S.OrderDate>
                  </S.OrderInfo>
                </S.OrderItem>
              ))}
            </S.OrderList>
          )}
        </S.Sidebar>
        <S.DetailArea>
          {detailLoading && <S.LoadingWrapper />}
          {!detailLoading && !orderDetail && (
            <S.EmptyState>
              <LogoIcon />
              <S.EmptyStateText>선택된 주문이 없습니다.</S.EmptyStateText>
            </S.EmptyState>
          )}
          {!detailLoading && orderDetail && (
            <>
              <S.DetailScrollArea>
                <S.Section>
                  <S.Label>제목</S.Label>
                  <S.DetailValue>{orderDetail.title}</S.DetailValue>
                </S.Section>
                <S.Section>
                  <S.Label>희망 마감일</S.Label>
                  <S.DetailValue>
                    {formatDeadline(orderDetail.deadline)}
                  </S.DetailValue>
                </S.Section>
                <S.Section>
                  <S.Label>내용</S.Label>
                  <S.DetailValue>{orderDetail.description}</S.DetailValue>
                </S.Section>
                <S.Section>
                  <S.Label>참고 자료</S.Label>
                  <S.ImageGrid>
                    {orderDetail.referenceFiles.map((file) => (
                      <S.ImageWrapper key={file.id}>
                        <S.Image src={file.url} />
                      </S.ImageWrapper>
                    ))}
                  </S.ImageGrid>
                </S.Section>
                {activeTab === 'CANCELLED' && orderDetail.cancelReason && (
                  <S.Section>
                    <S.Label>취소 사유</S.Label>
                    <S.DetailValue>{orderDetail.cancelReason}</S.DetailValue>
                  </S.Section>
                )}
              </S.DetailScrollArea>
              {selectedOrderId && getButtons(activeTab, selectedOrderId) && (
                <S.NavigationButtons>
                  {getButtons(activeTab, selectedOrderId)}
                </S.NavigationButtons>
              )}
            </>
          )}
        </S.DetailArea>
      </S.ContentArea>
      <CancelReasonModal
        isOpen={cancelTargetOrderId !== null}
        onClose={() => setCancelTargetOrderId(null)}
        onSubmit={handleCancelSubmit}
        userRole="provider"
      />
    </S.Container>
  );
};

export default OrderManagePanel;
