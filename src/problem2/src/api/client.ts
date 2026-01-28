import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '../common/config';
import { TOAST_MESSAGES } from '../common/messages/toast.messages';

/**
 * Industry standard pattern for Axios with interceptors.
 * We define multiple clients for different purposes.
 */

const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add common headers, auth tokens etc here
      // const token = localStorage.getItem('token');
      // if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      // handle global errors here
      const message = error.response?.data?.message || error.message || TOAST_MESSAGES.ERROR.GENERAL_DESC;
      console.error('[API Error]:', message);
      return Promise.reject(error);
    }
  );
};

// baseQuery for actual backend
export const baseQuery = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// priceQuery for this specific use case
export const priceQuery = axios.create({
  baseURL: API_CONFIG.PRICE_API_URL,
  timeout: 5000,
});

setupInterceptors(baseQuery);
setupInterceptors(priceQuery);
