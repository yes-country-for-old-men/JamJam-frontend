import type { OrderStatus } from '@/features/order/api/orderApi';

export interface OrderTab {
  id: OrderStatus;
  label: string;
}

export const ORDER_TABS: OrderTab[] = [
  { id: 'REQUESTED', label: '신규 문의' },
  { id: 'PREPARING', label: '진행 중' },
  { id: 'WAITING_CONFIRM', label: '확인 대기' },
  { id: 'COMPLETED', label: '작업 완료' },
  { id: 'CANCELLED', label: '작업 취소' },
];
