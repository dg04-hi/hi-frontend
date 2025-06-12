//* src/pages/customer/CustomerMain.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Search, LocationOn, Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CustomerNavigation } from '../../components/common/Navigation';

const CustomerMain = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recommend');
  const [selectedTags, setSelectedTags] = useState([]);
  const [stores, setStores] = useState([]);

  const availableTags = [
    '한식', '중식', '일식', '양식', '분식', '카페', '치킨', '피자',
    '혼밥', '가성비', '분위기', '데이트', '반려동물', '비건', '24시간'
  ];

  const mockStores = [
    {
      id: 1,
      name: '맛있는 한식당',
      location: '강남구 역삼동',
      distance: 250,
      rating: 4.5,
      reviewCount: 123,
      tags: ['한식', '혼밥', '가성비'],
      image: '/images/store1.jpg'
    },
    {
      id: 2,
      name: '이탈리안 레스토랑',
      location: '강남구 신사동',
      distance: 450,
      rating: 4.3,
      reviewCount: 87,
      tags: ['양식', '데이트', '분위기'],
      image: '/images/store2.jpg'
    },
    {
      id: 3,
      name: '분식천국',
      location: '강남구 압구정동',
      distance: 320,
      rating: 4.1,
      reviewCount: 156,
      tags: ['분식', '가성비', '혼밥'],
      image: '/images/store3.jpg'
    }
  ];

  useEffect(() => {
    setStores(mockStores);
  }, []);

  const formatNumber = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0';
  };

  const handleTagClick = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // 매장 클릭 핸들러 추가
  const handleStoreClick = (storeId) => {
    navigate(`/customer/store/${storeId}`);
  };

  const filteredStores = stores
    .filter(store => 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTags.length === 0 || selectedTags.some(tag => store.tags.includes(tag)))
    )
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'recommend') return b.rating - a.rating;
      return 0;
    });

  return (
    <Box className="mobile-container">
      {/* 헤더 */}
      <Box sx={{ p: 2, bgcolor: '#f39c12', color: 'white' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          맛집 추천
        </Typography>
        <Typography variant="body2">
          AI가 추천하는 나만의 맛집을 찾아보세요
        </Typography>
      </Box>

      <Box className="content-area">
        {/* 지도 영역 */}
        <Box sx={{ height: 200, bgcolor: '#e8f5e8', borderRadius: 1, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            🗺️ 지도 영역 (추후 구글맵 연동)
          </Typography>
        </Box>

        {/* 검색 */}
        <TextField
          fullWidth
          placeholder="맛집 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {/* 정렬 기준 */}
        <FormControl size="small" sx={{ mb: 2, minWidth: 120 }}>
          <InputLabel>정렬기준</InputLabel>
          <Select
            value={sortBy}
            label="정렬기준"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="distance">거리순</MenuItem>
            <MenuItem value="recommend">추천순</MenuItem>
            <MenuItem value="rating">평점순</MenuItem>
          </Select>
        </FormControl>

        {/* 취향 태그 */}
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          🍽️ 취향 선택
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {availableTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              clickable
              color={selectedTags.includes(tag) ? 'primary' : 'default'}
              onClick={() => handleTagClick(tag)}
              size="small"
            />
          ))}
        </Box>

        {/* 매장 목록 */}
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
          📍 추천 매장 ({filteredStores.length}개)
        </Typography>

        {filteredStores.map((store) => (
          <Card 
            key={store.id} 
            className="store-card" 
            sx={{ 
              mb: 2, 
              cursor: 'pointer',
              '&:hover': {
                boxShadow: 3,
                transform: 'scale(1.02)',
                transition: 'all 0.2s ease-in-out'
              }
            }}
            onClick={() => handleStoreClick(store.id)}
          >
            <Box sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: 80, height: 80 }}
                image={store.image}
                alt={store.name}
              />
              <CardContent sx={{ flex: 1, p: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {store.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                    {store.location} • {store.distance}m
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Star fontSize="small" sx={{ color: '#f39c12' }} />
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    {store.rating} ({formatNumber(store.reviewCount)}개 리뷰)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {store.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Box>

      <CustomerNavigation />
    </Box>
  );
};

export default CustomerMain;