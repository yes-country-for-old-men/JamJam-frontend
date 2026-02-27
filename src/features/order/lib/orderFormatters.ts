import type { OrderStatus } from '@/entities/order/api/orderApi';

export const formatOrderDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const formatDeadline = (deadline: string): string => {
  return deadline
    .split('T')[0]
    .replace(/-/g, '년 ')
    .replace(/년 (\d{2})$/, '년 $1월 ')
    .replace(/월 (\d{2})$/, '월 $1일');
};

export const getStatusLabel = (status: OrderStatus): string => {
  switch (status) {
    case 'REQUESTED':
      return '수락 대기';
    case 'PREPARING':
      return '진행 중';
    case 'WAITING_CONFIRM':
      return '확인 대기';
    case 'COMPLETED':
      return '완료';
    case 'CANCELLED':
      return '취소됨';
    default:
      return '';
  }
};
