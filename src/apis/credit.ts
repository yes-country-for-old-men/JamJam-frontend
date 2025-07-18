import apiClient from '@apis/apiClient';
import type APIResponse from '@type/APIResponse';

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
  apiClient.get<APIResponse<CreditHistoryContent>>('/api/user/credit-history', {
    params,
  });
