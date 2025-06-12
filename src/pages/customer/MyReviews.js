import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Rating,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { MoreVert, Edit, Delete } from '@mui/icons-material';
import { CustomerNavigation } from '../../components/common/Navigation';
import { formatDateTime } from '../../utils/helpers';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  const mockReviews = [
    {
      id: 1,
      storeName: '맛있는 한식당',
      rating: 5,
      content: '정말 맛있고 깨끗한 곳이에요. 혼밥하기에도 좋고 음식도 빨리 나와요.',
      createdAt: '2024-06-10T12:30:00',
      reactions: { like: 5, helpful: 3 },
      images: ['/images/menu-sample.jpg']
    },
    {
      id: 2,
      storeName: '분식천국',
      rating: 4,
      content: '가성비 좋고 맛도 괜찮습니다. 다만 점심시간에는 조금 붐비네요.',
      createdAt: '2024-06-09T18:45:00',
      reactions: { like: 2, helpful: 1 }
    }
  ];

  useEffect(() => {
    setReviews(mockReviews);
  }, []);

  const handleMenuOpen = (event, review) => {
    setAnchorEl(event.currentTarget);
    setSelectedReview(review);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReview(null);
  };

  const handleEdit = () => {
    console.log('Edit review:', selectedReview);
    handleMenuClose();
  };

  const handleDelete = () => {
    setReviews(prev => prev.filter(r => r.id !== selectedReview.id));
    handleMenuClose();
  };

  return (
    <Box className="mobile-container">
      {/* 헤더 */}
      <Box sx={{ p: 2, bgcolor: '#f39c12', color: 'white' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          내가 쓴 리뷰
        </Typography>
        <Typography variant="body2">
          총 {reviews.length}개의 리뷰를 작성했습니다
        </Typography>
      </Box>

      <Box className="content-area">
        {reviews.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body1" color="text.secondary">
              아직 작성한 리뷰가 없습니다.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              맛집을 방문하고 첫 리뷰를 작성해보세요!
            </Typography>
          </Box>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="review-card" sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {review.storeName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDateTime(review.createdAt)}
                    </Typography>
                  </Box>
                  <IconButton 
                    size="small"
                    onClick={(e) => handleMenuOpen(e, review)}
                  >
                    <MoreVert />
                  </IconButton>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={review.rating} size="small" readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {review.rating}점
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  {review.content}
                </Typography>

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

                <Box sx={{ display: 'flex', gap: 1 }}>
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
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          수정하기
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Delete fontSize="small" sx={{ mr: 1 }} />
          삭제하기
        </MenuItem>
      </Menu>

      <CustomerNavigation />
    </Box>
  );
};

export default MyReviews;
