//* src/pages/owner/StoreList.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import { 
  Add,
  Star,
  LocationOn,
  Schedule,
  CheckCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import { OwnerNavigation } from '../../components/common/Navigation';

const StoreList = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);

  const mockStores = [
    {
      id: 1,
      name: '맛있는 식당',
      address: '서울 강남구 테헤란로 123',
      category: '한식',
      rating: 4.5,
      reviewCount: 23,
      status: '영업중',
      plan: '기본 플랜',
      image: '/images/store1.jpg',
      hasUnreadReviews: true
    },
    {
      id: 2,
      name: '분식천국',
      address: '서울 강남구 역삼동 456',
      category: '분식',
      rating: 4.1,
      reviewCount: 18,
      status: '영업중',
      plan: '프리미엄 플랜',
      image: '/images/store2.jpg',
      hasUnreadReviews: false
    }
  ];

  useEffect(() => {
    setStores(mockStores);
  }, []);

  const handleStoreSelect = (storeId) => {
    navigate(`/owner/dashboard/${storeId}`);
  };

  const handleNewStore = () => {
    navigate('/owner/store/register');
  };

  return (
    <Box className="mobile-container">
      <Header title="내 매장 목록" onBack={() => navigate(-1)} />
      
      <Box className="content-area">
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          등록된 매장 ({stores.length}개)
        </Typography>

        <List>
          {stores.map((store, index) => (
            <React.Fragment key={store.id}>
              <ListItem 
                sx={{ 
                  p: 0, 
                  mb: 2,
                  cursor: 'pointer'
                }}
                onClick={() => handleStoreSelect(store.id)}
              >
                <Card sx={{ width: '100%' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={store.image}
                        sx={{ width: 60, height: 60 }}
                      >
                        {store.name[0]}
                      </Avatar>
                      
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {store.name}
                          </Typography>
                          {store.hasUnreadReviews && (
                            <Chip 
                              label="새 리뷰" 
                              size="small" 
                              color="primary" 
                              sx={{ fontSize: '0.7rem', height: 20 }}
                            />
                          )}
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                          <LocationOn sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {store.address}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Star sx={{ fontSize: 14, color: '#f39c12' }} />
                            <Typography variant="caption">
                              {store.rating} ({store.reviewCount}개 리뷰)
                            </Typography>
                          </Box>
                          
                          <Chip 
                            label={store.status}
                            size="small" 
                            color={store.status === '영업중' ? 'success' : 'default'}
                            sx={{ fontSize: '0.7rem', height: 20 }}
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold' }}>
                            {store.plan}
                          </Typography>
                          {store.hasUnreadReviews && (
                            <Typography variant="caption" color="primary">
                              • 모든 리뷰에 답변 완료
                            </Typography>
                          )}
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                        선택
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </ListItem>
              
              {index < stores.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        {/* 새 매장 등록 버튼 */}
        <Card 
          sx={{ 
            mt: 2, 
            border: '2px dashed #ddd',
            cursor: 'pointer',
            '&:hover': { borderColor: '#3498db' }
          }}
          onClick={handleNewStore}
        >
          <CardContent sx={{ textAlign: 'center', py: 3 }}>
            <Add sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
            <Typography variant="body1" color="text.secondary">
              새 매장 등록
            </Typography>
          </CardContent>
        </Card>

        {/* 선택된 매장으로 이동 버튼 */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3 }}
          onClick={() => handleStoreSelect(stores[0]?.id)}
          disabled={stores.length === 0}
        >
          🏪 선택된 매장 관리하기
        </Button>
      </Box>

      <OwnerNavigation />
    </Box>
  );
};

export default StoreList;