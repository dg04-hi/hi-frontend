import { memberApi } from './api';

export const subscriptionService = {
  // 구독 정보 조회
  getSubscriptionInfo: async () => {
    const response = await memberApi.get('/api/subscription/info');
    return response.data;
  },

  // 구독 플랜 목록 조회
  getSubscriptionPlans: async () => {
    const response = await memberApi.get('/api/subscription/plans');
    return response.data;
  },

  // 구독 변경
  changeSubscription: async (planId) => {
    const response = await memberApi.post('/api/subscription/change', { planId });
    return response.data;
  },

  // 구독 갱신
  renewSubscription: async () => {
    const response = await memberApi.post('/api/subscription/renew');
    return response.data;
  }
};
