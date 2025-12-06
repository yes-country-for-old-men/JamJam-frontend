import type { OrderStatus } from '@apis/order';

export type UserRole = 'CLIENT' | 'PROVIDER';

export const isProvider = (role: string): role is 'PROVIDER' => {
  return role === 'PROVIDER';
};

export const isClient = (role: string): role is 'CLIENT' => {
  return role === 'CLIENT';
};

export const isOrderStatus = (status: string): status is OrderStatus => {
  return [
    'REQUESTED',
    'PREPARING',
    'CANCELLED',
    'WAITING_CONFIRM',
    'COMPLETED',
  ].includes(status);
};
