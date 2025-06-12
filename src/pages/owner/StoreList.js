import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip
} from '@mui/material';
import { Add, Star, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import { formatNumber } from '../../utils/helpers';

const StoreList = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);

  const mockStores = [
    {
      id: 1,
      name: '맛있는 한식당',
      location: '서울 강남구 역삼동',
      rating: 4.5,
      reviewCount: 127,
      status: '영업중',
      plan: '베이직 플랜',
      hasReplyAll: true,
      image: '/images/store-sample.jpg'
    },
    {
      id: 2,
      name: '분식천국',
      location: '서울 강남구 역삼동',
      rating: 4.1,
      reviewCount: 89,
      status: '영업중',
      plan: '기본 플랜',
      hasReplyAll: true,
      image: '/images/store-sample.jpg'
    }
  ];

  useEffect(() => {
    setStores(mockStores);
  }, []);

  const handleStoreSelect = (storeId) => {
    navigate(`/owner/store/${storeId}/management`);
  };

  return (
    <Box className="mobile-container">
      <Header title="내 매장 목록" showBackButton={false} />
      
      <Box className="content-area">
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          등록된 매장 ({stores.length}개)
        </Typography>

        {stores.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              등록된 매장이 없습니다.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              매장을 등록해주세요.
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/owner/store/register')}
            >
              매장 등록하기
            </Button>
          </Box>
        ) : (
          <>
            {stores.map((store) => (
              <Card key={store.id} className="store-card" sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex' }}>
                  <Box
                    component="img"
                    sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
                    src={store.image}
                    alt={store.name}
                  />
                  <CardContent sx={{ flex: 1, p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {store.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {store.location}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Star fontSize="small" sx={{ color: '#f39c12', mr: 0.5 }} />
                      <Typography variant="body2">
                        {store.rating} ({formatNumber(store.reviewCount)}개 리뷰)
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                      <Chip 
                        label={store.status} 
                        size="small" 
                        color="success" 
                        variant="outlined" 
                      />
                      <Chip 
                        label={store.plan} 
                        size="small" 
                        variant="outlined" 
                      />
                    </Box>

                    {store.hasReplyAll && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircle fontSize="small" sx={{ color: '#3498db', mr: 0.5 }} />
                        <Typography variant="caption" color="primary">
                          모든 리뷰에 답변 완료
                        </Typography>
                      </Box>
                    )}

                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleStoreSelect(store.id)}
                      sx={{ mt: 1, float: 'right' }}
                    >
                      선택
                    </Button>
                  </CardContent>
                </Box>
              </Card>
            ))}

            {/* 새 매장 등록 */}
            <Card 
              sx={{ 
                mb: 2, 
                border: '2px dashed #ddd', 
                cursor: 'pointer',
                '&:hover': { borderColor: '#f39c12' }
              }}
              onClick={() => navigate('/owner/store/register')}
            >
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Add sx={{ fontSize: 48, color: '#ddd', mb: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  새 매장 등록
                </Typography>
              </CardContent>
            </Card>

            {/* 선택된 매장으로 이동 */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => handleStoreSelect(1)}
              sx={{ 
                mt: 2, 
                bgcolor: '#2c3e50',
                '&:hover': { bgcolor: '#34495e' }
              }}
            >
              🏪 선택된 매장 관리하기
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default StoreList;//* src/pages/customer/StoreDetail.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Rating,
  Avatar,
  Divider
} from '@mui/material';
import { LocationOn, Phone, AccessTime, Star } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import { formatNumber, formatDateTime } from '../../utils/helpers';

const StoreDetail = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [reviews, setReviews] = useState([]);

  const mockStore = {
    id: 1,
    name: '맛있는 한식당',
    location: '서울 강남구 역삼동 123-45',
    phone: '02-1234-5678',
    operatingHours: '11:00 - 22:00',
    rating: 4.5,
    reviewCount: 127,
    description: '정성스럽게 만든 한식 요리를 제공합니다.',
    tags: ['한식', '혼밥', '깨끗', '맛집'],
    image: '/images/store-sample.jpg'
  };

  const mockReviews = [
    {
      id: 1,
      memberNickname: '맛집탐험가',
      rating: 5,
      content: '정말 맛있고 깨끗한 곳이에요. 혼밥하기에도 좋고 음식도 빨리 나와요.',
      createdAt: '2024-06-10T12:30:00',
      reactions: { like: 5, helpful: 3 },
      images: ['/images/menu-sample.jpg']
    },
    {
      id: 2,
      memberNickname: '일상먹방',
      rating: 4,
      content: '가성비 좋고 맛도 괜찮습니다. 다만 점심시간에는 조금 붐비네요.',
      createdAt: '2024-06-09T18:45:00',
      reactions: { like: 2, helpful: 1 }
    }
  ];

  useEffect(() => {
    setStore(mockStore);
    setReviews(mockReviews);
  }, [storeId]);

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="mobile-container">
      <Header title="매장 정보" />
      
      <Box className="content-area">
        {/* 매장 기본 정보 */}
        <Card sx={{ mb: 2 }}>
          <Box
            component="img"
            sx={{ width: '100%', height: 200, objectFit: 'cover' }}
            src={store.image}
            alt={store.name}
          />
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              {store.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Star sx={{ color: '#f39c12', mr: 0.5 }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {store.rating}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({formatNumber(store.reviewCount)}개 리뷰)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn fontSize="small" color="action" />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {store.location}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone fontSize="small" color="action" />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {store.phone}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccessTime fontSize="small" color="action" />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {store.operatingHours}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {store.description}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {store.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate(`/customer/review/write/${storeId}`)}
            >
              리뷰 작성하기
            </Button>
          </CardContent>
        </Card>

        {/* 리뷰 목록 */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          리뷰 ({formatNumber(reviews.length)})
        </Typography>

        {reviews.map((review) => (
          <Card key={review.id} className="review-card" sx={{ mb: 2 }}>
            <CardContent>
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
                <Button size="small" variant="outlined">
                  👍 {review.reactions.like}
                </Button>
                <Button size="small" variant="outlined">
                  💡 {review.reactions.helpful}
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default StoreDetail;
