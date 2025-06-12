import { memberApi } from './api';

export const memberService = {
  // 회원가입
  register: async (signupData) => {
    const response = await memberApi.post('/api/members/register', signupData);
    return response.data;
  },

  // 마이페이지 조회
  getMyPageInfo: async () => {
    const response = await memberApi.get('/api/members/profile');
    return response.data;
  },

  // 닉네임 변경
  updateNickname: async (nickname) => {
    const response = await memberApi.put('/api/members/nickname', { nickname });
    return response.data;
  },

  // 아이디 변경
  updateUsername: async (username) => {
    const response = await memberApi.put(`/api/members/username?username=${username}`);
    return response.data;
  },

  // 비밀번호 변경
  updatePassword: async (passwordData) => {
    const response = await memberApi.put('/api/members/password', passwordData);
    return response.data;
  },

  // 취향 저장
  savePreferences: async (preferences) => {
    const response = await memberApi.post('/api/members/preferences', preferences);
    return response.data;
  },

  // 취향 태그 목록 조회
  getAvailableTags: async () => {
    const response = await memberApi.get('/api/members/preferences/tags');
    return response.data;
  },

  // 아이디 중복 확인
  checkUsernameAvailability: async (username) => {
    const response = await memberApi.get(`/api/members/check-username?username=${username}`);
    return response.data;
  }
};
