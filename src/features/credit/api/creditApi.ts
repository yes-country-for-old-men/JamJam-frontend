import apiClient from '@/shared/api/apiClient';
import type ApiResponse from '@/shared/types/ApiResponse';

export interface CreditHistoryRequest {
  type: 'DEPOSIT' | 'WITHDRAW' | 'ALL';
  page?: number;
  size?: number;
}

export type CreditHistoryItem = {
  amount: number;
  reason: string;
  createdAt: string;
};

export type CreditHistoryContent = {
  histories: CreditHistoryItem[];
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
};

export const getCreditHistory = (params: CreditHistoryRequest) =>
  apiClient.get<ApiResponse<CreditHistoryContent>>('/api/user/credit-history', {
    params,
  });
