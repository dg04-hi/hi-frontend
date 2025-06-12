import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  Restaurant, 
  RateReview, 
  Settings, 
  Analytics,
  ChevronRight
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import { OwnerNavigation } from '../../components/common/Navigation';
import { formatNumber } from '../../utils/helpers';

const StoreManagement = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);

  const mockStore = {
    id: 1,
    name: '분식천국',
    location: '서울 강남구 역삼동 123-45',
    phone: '02-1234-5678',
    operatingHours: '11:00 - 22:00',
    rating: 4.1,
    reviewCount: 89,
    menuCount: 12,
    image: '/images/store-sample.jpg'
  };

  useEffect(() => {
    setStore(mockStore);
  }, [storeId]);

  if (!store) {
    return <div>Loading...</div>;
  }

  const menuItems = [
    {
      icon: <Restaurant />,
      title: '메뉴 관리',
      description: `${formatNumber(store.menuCount)}개 메뉴 등록됨`,
      action: () => navigate(`/owner/store/${storeId}/menu`)
    },
    {
      icon: <RateReview />,
      title: '내 매장 리뷰',
      description: `${formatNumber(store.reviewCount)}개 리뷰`,
      action: () => navigate(`/owner/store/${storeId}/reviews`)
    },
    {
      icon: <Analytics />,
      title: '매장 분석',
      description: 'AI 피드백 및 통계 분석',
      action: () => navigate(`/owner/analytics/${storeId}`)
    },
    {
      icon: <Settings />,
      title: '매장 정보 관리',
      description: '기본 정보, 운영시간 등',
      action: () => navigate(`/owner/store/${storeId}/info`)
    }
  ];

  return (
    <Box className="mobile-container">
      <Header title="매장 관리" />
      
      <Box className="content-area">
        {/* 매장 정보 카드 */}
        <Card sx={{ mb: 3 }}>
          <Box
            component="img"
            sx={{ width: '100%', height: 150, objectFit: 'cover' }}
            src={store.image}
            alt={store.name}
          />
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              {store.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              📍 {store.location}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              📞 {store.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              🕒 {store.operatingHours}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f39c12' }}>
                  {store.rating}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  평점
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3498db' }}>
                  {formatNumber(store.reviewCount)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  리뷰수
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#27ae60' }}>
                  {store.menuCount}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  메뉴수
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* 관리 메뉴 */}
        <Card>
          <CardContent sx={{ p: 0 }}>
            <List>
              {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem button onClick={item.action}>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      secondary={item.description}
                    />
                    <ChevronRight />
                  </ListItem>
                  {index < menuItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      <OwnerNavigation />
    </Box>
  );
};

export default StoreManagement;
