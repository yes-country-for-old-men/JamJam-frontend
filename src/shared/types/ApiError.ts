import type { AxiosError } from 'axios';

export interface ApiErrorResponse {
  code?: string;
  message?: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;
