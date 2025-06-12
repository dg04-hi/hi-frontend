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

export default StoreList;