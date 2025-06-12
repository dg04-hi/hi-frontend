import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Rating,
  Avatar,
  Chip,
  TextField,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { MoreVert, Reply, Edit, Delete } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import { formatDateTime } from '../../utils/helpers';
import Modal from '../../components/ui/Modal';
import { OwnerNavigation } from '../../components/common/Navigation';

const ReviewManagement = () => {
  const { storeId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyModal, setReplyModal] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);

  const mockReviews = [
    {
      id: 1,
      memberNickname: '맛집탐험가',
      rating: 5,
      content: '정말 맛있고 깨끗한 곳이에요. 혼밥하기에도 좋고 음식도 빨리 나와요.',
      createdAt: '2024-06-10T12:30:00',
      reactions: { like: 5, helpful: 3 },
      images: ['/images/menu-sample.jpg'],
      comment: null
    },
    {
      id: 2,
      memberNickname: '일상먹방',
      rating: 4,
      content: '가성비 좋고 맛도 괜찮습니다. 다만 점심시간에는 조금 붐비네요.',
      createdAt: '2024-06-09T18:45:00',
      reactions: { like: 2, helpful: 1 },
      comment: {
        id: 101,
        content: '소중한 리뷰 감사합니다. 점심시간 대기시간 단축을 위해 노력하겠습니다!',
        createdAt: '2024-06-09T19:00:00'
      }
    },
    {
      id: 3,
      memberNickname: '음식러버',
      rating: 3,
      content: '맛은 괜찮은데 서비스가 조금 아쉬웠어요.',
      createdAt: '2024-06-08T14:20:00',
      reactions: { like: 1, helpful: 0 },
      comment: null
    }
  ];

  useEffect(() => {
    setReviews(mockReviews);
  }, [storeId]);

  const handleReply = (review) => {
    setSelectedReview(review);
    setReplyContent(review.comment?.content || '');
    setReplyModal(true);
  };

  const handleSaveReply = () => {
    setReviews(prev => prev.map(review => 
      review.id === selectedReview.id 
        ? {
            ...review,
            comment: {
              id: Date.now(),
              content: replyContent,
              createdAt: new Date().toISOString()
            }
          }
        : review
    ));
    setReplyModal(false);
    setReplyContent('');
  };

  const handleCommentMenu = (event, comment, reviewId) => {
    setAnchorEl(event.currentTarget);
    setSelectedComment({ ...comment, reviewId });
  };

  const handleDeleteComment = () => {
    setReviews(prev => prev.map(review => 
      review.id === selectedComment.reviewId 
        ? { ...review, comment: null }
        : review
    ));
    setAnchorEl(null);
    setSelectedComment(null);
  };

  const handleEditComment = () => {
    const review = reviews.find(r => r.id === selectedComment.reviewId);
    handleReply(review);
    setAnchorEl(null);
    setSelectedComment(null);
  };

  return (
    <Box className="mobile-container">
      <Header title="내 매장 리뷰" />
      
      <Box className="content-area">
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          고객 리뷰 관리 ({reviews.length}개)
        </Typography>

        {reviews.map((review) => (
          <Card key={review.id} className="review-card" sx={{ mb: 2 }}>
            <CardContent>
              {/* 리뷰 헤더 */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                  {review.memberNickname[0]}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {review.memberNickname}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDateTime(review.createdAt)}
                  </Typography>
                </Box>
                <Rating value={review.rating} size="small" readOnly />
              </Box>

              {/* 리뷰 내용 */}
              <Typography variant="body2" sx={{ mb: 1 }}>
                {review.content}
              </Typography>

              {/* 리뷰 이미지 */}
              {review.images && review.images.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  {review.images.map((image, index) => (
                    <Box
                      key={index}
                      component="img"
                      sx={{ width: 60, height: 60, borderRadius: 1, objectFit: 'cover' }}
                      src={image}
                      alt={`리뷰 이미지 ${index + 1}`}
                    />
                  ))}
                </Box>
              )}

              {/* 리뷰 반응 */}
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip 
                  label={`👍 ${review.reactions.like}`}
                  size="small"
                  variant="outlined"
                />
                <Chip 
                  label={`💡 ${review.reactions.helpful}`}
                  size="small"
                  variant="outlined"
                />
              </Box>

              {/* 점주 댓글 */}
              {review.comment ? (
                <Box sx={{ bgcolor: '#f8f9fa', p: 2, borderRadius: 1, mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      사장님 답글
                    </Typography>
                    <IconButton 
                      size="small"
                      onClick={(e) => handleCommentMenu(e, review.comment, review.id)}
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {review.comment.content}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDateTime(review.comment.createdAt)}
                  </Typography>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Reply />}
                  onClick={() => handleReply(review)}
                  fullWidth
                >
                  답글 작성하기
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* 답글 작성/수정 모달 */}
      <Modal
        open={replyModal}
        onClose={() => setReplyModal(false)}
        title={selectedReview?.comment ? '답글 수정' : '답글 작성'}
        actions={
          <>
            <Button onClick={() => setReplyModal(false)}>
              취소
            </Button>
            <Button variant="contained" onClick={handleSaveReply}>
              저장
            </Button>
          </>
        }
      >
        <Box sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            "{selectedReview?.content}"
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="고객에게 정중하고 친절한 답글을 작성해주세요. (10자 이상 100자 미만)"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            helperText={`${replyContent.length}/100자`}
          />
        </Box>
      </Modal>

      {/* 댓글 메뉴 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleEditComment}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          수정하기
        </MenuItem>
        <MenuItem onClick={handleDeleteComment} sx={{ color: 'error.main' }}>
          <Delete fontSize="small" sx={{ mr: 1 }} />
          삭제하기
        </MenuItem>
      </Menu>
   <OwnerNavigation /> </Box>
  );
};

export default ReviewManagement;
