// API URL 설정
export const API_URLS = {
  AUTH: window.__runtime_config__?.AUTH_URL || 'http://20.1.2.3/auth',
  MEMBER: window.__runtime_config__?.MEMBER_URL || 'http://20.1.2.3/member',
  STORE: window.__runtime_config__?.STORE_URL || 'http://20.1.2.3/store',
  REVIEW: window.__runtime_config__?.REVIEW_URL || 'http://20.1.2.3/review',
  ANALYTICS: window.__runtime_config__?.ANALYTICS_URL || 'http://20.1.2.3/analytics',
  RECOMMEND: window.__runtime_config__?.RECOMMEND_URL || 'http://20.1.2.3/recommend'
};

// 사용자 역할
export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  OWNER: 'OWNER'
};

// 리뷰 반응 타입
export const REACTION_TYPES = {
  LIKE: 'LIKE',
  HELPFUL: 'HELPFUL',
  TASTY: 'TASTY'
};

// 구독 플랜
export const SUBSCRIPTION_PLANS = {
  FREE: 'FREE',
  BASIC: 'BASIC',
  PREMIUM: 'PREMIUM'
};
