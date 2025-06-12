import { authApi } from './api';

export const authService = {
  // 로그인
  login: async (username, password, userType) => {
    const response = await authApi.post('/api/auth/login', {
      username,
      password,
      userType
    });
    return response.data;
  },

  // 토큰 갱신
  refreshToken: async (refreshToken) => {
    const response = await authApi.post('/api/auth/refresh', {
      refreshToken
    });
    return response.data;
  },

  // 로그아웃
  logout: async () => {
    const response = await authApi.post('/api/auth/logout');
    return response.data;
  }
};
