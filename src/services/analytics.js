import { analyticsApi } from './api';

export const analyticsService = {
  // 주문 통계 조회
  getOrderStatistics: async (storeId, period = 'month') => {
    const response = await analyticsApi.get(`/api/analytics/${storeId}/order-statistics`, {
      params: { period }
    });
    return response.data;
  },

  // AI 피드백 조회
  getAIFeedback: async (storeId) => {
    const response = await analyticsApi.get(`/api/analytics/${storeId}/ai-feedback`);
    return response.data;
  },

  // 리뷰 분석 조회
  getReviewAnalysis: async (storeId, startDate, endDate) => {
    const response = await analyticsApi.get(`/api/analytics/${storeId}/review-analysis`, {
      params: { startDate, endDate }
    });
    return response.data;
  },

  // 실행 계획 조회
  getActionPlans: async (storeId) => {
    const response = await analyticsApi.get(`/api/analytics/${storeId}/action-plans`);
    return response.data;
  },

  // 실행 계획 저장
  saveActionPlan: async (storeId, actionPlanData) => {
    const response = await analyticsApi.post(`/api/analytics/${storeId}/action-plans`, actionPlanData);
    return response.data;
  },

  // 실행 계획 완료 처리
  completeActionPlan: async (storeId, planId) => {
    const response = await analyticsApi.put(`/api/analytics/${storeId}/action-plans/${planId}/complete`);
    return response.data;
  }
};
