import axios from 'axios';
import { setupInterceptors } from '@/shared/api/setupInterceptors';

export const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

setupInterceptors(apiClient);
