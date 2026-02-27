import { apiClient } from '@/shared/api/apiClient';
import { createMultipartRequest } from '@/shared/lib';
import type { ApiResponse } from '@/shared/types/ApiResponse';

export interface OrderRegisterRequest {
  request: {
    title: string;
    deadline: string;
    description: string;
    price: number;
    serviceId: number;
  };
  referenceFiles?: File[];
}

export interface PaymentRequest {
  orderId: number;
  price: number;
}

export type OrderStatus =
  | 'REQUESTED'
  | 'PREPARING'
  | 'CANCELLED'
  | 'WAITING_CONFIRM'
  | 'COMPLETED';

interface OrderStatusChangeRequest {
  orderId: number;
  orderStatus: OrderStatus;
  cancelReason?: string;
}

interface OrderConfirmRequest {
  orderId: number;
}

interface OrderCancelRequest {
  orderId: number;
  orderStatus: OrderStatus;
  cancelReason?: string;
}

interface OrderListRequest {
  orderStatus: OrderStatus;
  page?: number;
  size?: number;
}

interface OrderDetailRequest {
  orderId: number;
}

export type OrderListItem = {
  orderId: number;
  title: string;
  client: string;
  orderedAt: string;
};

export type OrderListContent = {
  orders: OrderListItem[];
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
};

export type MyOrderListItem = {
  orderId: number;
  title: string;
  serviceId: number;
  serviceName: string;
  thumbnailUrl: string;
  orderedAt: string;
  orderStatus: OrderStatus;
  price?: number | null;
};

export type MyOrderListContent = {
  orders: MyOrderListItem[];
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
};

interface MyOrderListRequest {
  page?: number;
  size?: number;
}

export type OrderDetailContent = {
  title: string;
  clientId: number;
  providerId: number;
  deadline: string;
  description: string;
  referenceFiles: { id: number; url: string }[];
  cancelReason?: string;
};

export type OrderCountContent = {
  requested: number;
  preparing: number;
  waitingConfirm: number;
  completed: number;
  cancelled: number;
};

export const registerOrder = (data: OrderRegisterRequest) => {
  const { data: formData, headers } = createMultipartRequest(data.request, {
    referenceFiles: data.referenceFiles,
  });

  return apiClient.post<ApiResponse<void>>('/api/order/register', formData, {
    headers,
  });
};

export const changeOrderStatus = (data: OrderStatusChangeRequest) =>
  apiClient.patch<ApiResponse<void>>('/api/order/provider/change-status', data);

export const confirmOrder = (params: OrderConfirmRequest) =>
  apiClient.patch<ApiResponse<void>>(
    `/api/order/client/${params.orderId}/confirm`,
  );

export const cancelOrder = (data: OrderCancelRequest) =>
  apiClient.patch<ApiResponse<void>>('/api/order/client/cancel', data);

export const getOrderList = (params: OrderListRequest) =>
  apiClient.get<ApiResponse<OrderListContent>>(
    '/api/order/provider/order-list',
    {
      params,
    },
  );

export const getOrderDetail = (params: OrderDetailRequest) =>
  apiClient.get<ApiResponse<OrderDetailContent>>('/api/order/detail', {
    params,
  });

export const getOrderCount = () =>
  apiClient.get<ApiResponse<OrderCountContent>>('/api/order/count');

export const getMyOrderList = (params: MyOrderListRequest) =>
  apiClient.get<ApiResponse<MyOrderListContent>>(
    '/api/order/client/order-list',
    {
      params,
    },
  );

export const requestPayment = (data: PaymentRequest) =>
  apiClient.post<ApiResponse<void>>('/api/order/request_payment', data);

export const processPayment = (data: PaymentRequest) =>
  apiClient.post<ApiResponse<void>>('/api/order/payment', data);
