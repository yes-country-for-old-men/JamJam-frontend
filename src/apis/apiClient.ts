import axios from 'axios';
import setupInterceptors from '@apis/setupInterceptors';

const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

setupInterceptors(apiClient);

export default apiClient;
