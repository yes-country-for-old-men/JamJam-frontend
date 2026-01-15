import type { AxiosError } from 'axios';

export interface ApiErrorResponse {
  message?: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;
