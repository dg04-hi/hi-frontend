import axios from 'axios';
import { API_URLS } from '../utils/constants';

// API 인스턴스 생성
const createApiInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// 각 서비스별 API 인스턴스
export const authApi = createApiInstance(API_URLS.AUTH);
export const memberApi = createApiInstance(API_URLS.MEMBER);
export const storeApi = createApiInstance(API_URLS.STORE);
export const reviewApi = createApiInstance(API_URLS.REVIEW);
export const analyticsApi = createApiInstance(API_URLS.ANALYTICS);
export const recommendApi = createApiInstance(API_URLS.RECOMMEND);
