import { reviewApi } from './api';

export const reviewService = {
  // 리뷰 목록 조회
  getReviewList: async (storeId, params = {}) => {
    const response = await reviewApi.get(`/api/reviews/store/${storeId}`, { params });
    return response.data;
  },

  // 내가 작성한 리뷰 목록 조회
  getMyReviews: async () => {
    const response = await reviewApi.get('/api/reviews/my');
    return response.data;
  },

  // 리뷰 작성
  writeReview: async (reviewData) => {
    const response = await reviewApi.post('/api/reviews', reviewData);
    return response.data;
  },

  // 리뷰 수정
  updateReview: async (reviewId, reviewData) => {
    const response = await reviewApi.put(`/api/reviews/${reviewId}`, reviewData);
    return response.data;
  },

  // 리뷰 삭제
  deleteReview: async (reviewId) => {
    const response = await reviewApi.delete(`/api/reviews/${reviewId}`);
    return response.data;
  },

  // 리뷰 반응
  reactToReview: async (reviewId, reactionType) => {
    const response = await reviewApi.post(`/api/reviews/${reviewId}/reactions`, { reactionType });
    return response.data;
  },

  // 리뷰 댓글 작성
  writeReviewComment: async (reviewId, content) => {
    const response = await reviewApi.post(`/api/reviews/${reviewId}/comments`, { content });
    return response.data;
  },

  // 리뷰 댓글 수정
  updateReviewComment: async (reviewId, commentId, content) => {
    const response = await reviewApi.put(`/api/reviews/${reviewId}/comments/${commentId}`, { content });
    return response.data;
  },

  // 리뷰 댓글 삭제
  deleteReviewComment: async (reviewId, commentId) => {
    const response = await reviewApi.delete(`/api/reviews/${reviewId}/comments/${commentId}`);
    return response.data;
  },

  // 영수증 검증
  verifyReceipt: async (storeId, receiptImage) => {
    const formData = new FormData();
    formData.append('receiptImage', receiptImage);
    const response = await reviewApi.post(`/api/reviews/verify-receipt/${storeId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};
