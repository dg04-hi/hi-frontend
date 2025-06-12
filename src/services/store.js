import { storeApi } from './api';

export const storeService = {
  // 매장 목록 조회
  getStoreList: async () => {
    const response = await storeApi.get('/api/stores');
    return response.data;
  },

  // 매장 상세 조회
  getStoreDetail: async (storeId) => {
    const response = await storeApi.get(`/api/stores/${storeId}`);
    return response.data;
  },

  // 매장 등록
  registerStore: async (storeData) => {
    const response = await storeApi.post('/api/stores', storeData);
    return response.data;
  },

  // 매장 정보 수정
  updateStore: async (storeId, storeData) => {
    const response = await storeApi.put(`/api/stores/${storeId}`, storeData);
    return response.data;
  },

  // 메뉴 목록 조회
  getMenuList: async (storeId) => {
    const response = await storeApi.get(`/api/stores/${storeId}/menus`);
    return response.data;
  },

  // 메뉴 등록
  addMenu: async (storeId, menuData) => {
    const response = await storeApi.post(`/api/stores/${storeId}/menus`, menuData);
    return response.data;
  },

  // 메뉴 수정
  updateMenu: async (storeId, menuId, menuData) => {
    const response = await storeApi.put(`/api/stores/${storeId}/menus/${menuId}`, menuData);
    return response.data;
  },

  // 외부 플랫폼 연동
  connectExternalPlatform: async (storeId, platformData) => {
    const response = await storeApi.post(`/api/stores/${storeId}/external-platforms`, platformData);
    return response.data;
  },

  // 외부 플랫폼 연동 해제
  disconnectExternalPlatform: async (storeId, platformType) => {
    const response = await storeApi.delete(`/api/stores/${storeId}/external-platforms/${platformType}`);
    return response.data;
  },

  // 외부 리뷰 동기화
  syncExternalReviews: async (storeId) => {
    const response = await storeApi.post(`/api/stores/${storeId}/sync-reviews`);
    return response.data;
  }
};
