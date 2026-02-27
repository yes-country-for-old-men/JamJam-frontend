import styled from '@emotion/styled';
import type { OrderStatus } from '@/entities/order/api/orderApi';

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OrderCard = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
`;

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid ${(props) => props.theme.COLORS.GRAY[5]};
`;

export const OrderDate = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
`;

export const StatusBadge = styled.span<{ status: OrderStatus }>`
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 700;
  background-color: ${(props) => {
    switch (props.status) {
      case 'REQUESTED':
        return '#F3F4F6';
      case 'PREPARING':
        return '#E6F4FF';
      case 'WAITING_CONFIRM':
        return '#FFF7E6';
      case 'COMPLETED':
        return '#E6FFFB';
      case 'CANCELLED':
        return '#FFF0F1';
      default:
        return '#F3F4F6';
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case 'REQUESTED':
        return '#6B7280';
      case 'PREPARING':
        return '#0091FF';
      case 'WAITING_CONFIRM':
        return '#FA8C16';
      case 'COMPLETED':
        return '#00C2A8';
      case 'CANCELLED':
        return '#FF4D4F';
      default:
        return '#6B7280';
    }
  }};
`;

export const OrderBody = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
`;

export const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  flex-shrink: 0;
  cursor: pointer;
`;

export const ThumbnailPlaceholder = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.COLORS.GRAY[5]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;

  svg {
    width: 28px;
    height: 28px;
    opacity: 0.5;
  }
`;

export const OrderContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

export const ServiceName = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  margin-bottom: 2px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const OrderTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
`;

export const PriceLabel = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
`;

export const Price = styled.span`
  font-size: 15px;
  font-weight: 700;
`;

export const OrderActions = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  background-color: white;
  border-radius: 12px;
`;

export const EmptyStateText = styled.p`
  color: ${(props) => props.theme.COLORS.LABEL.SECONDARY};
  margin-top: 16px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-color: white;
  border-radius: 12px;
`;
