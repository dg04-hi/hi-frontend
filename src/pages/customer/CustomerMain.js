import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Search, LocationOn, Star } from '@mui/icons-material';
import { CustomerNavigation } from '../../components/common/Navigation';
import { formatNumber } from '../../utils/helpers';

const CustomerMain = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [selectedTags, setSelectedTags] = useState([]);
  const [stores, setStores] = useState([]);

  const availableTags = [
    '한식', '중식', '일식', '양식', '분식', '치킨', '피자', '카페',
    '혼밥', '데이트', '회식', '가족', '깨끗', '맛집', '가성비'
  ];

  const mockStores = [
    {
      id: 1,
      name: '맛있는 한식당',
      location: '서울 강남구 역삼동',
      rating: 4.5,
      reviewCount: 127,
      tags: ['한식', '혼밥', '깨끗'],
      distance: 250,
      image: '/images/store-sample.jpg'
    },
    {
      id: 2,
      name: '분식천국',
      location: '서울 강남구 역삼동',
      rating: 4.1,
      reviewCount: 89,
      tags: ['분식', '가성비', '빠른'],
      distance: 350,
      image: '/images/store-sample.jpg'
    }
  ];

  useEffect(() => {
    setStores(mockStores);
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredStores = stores
    .filter(store => 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTags.length === 0 || selectedTags.some(tag => store.tags.includes(tag)))
    )
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'recommend') return b.rating - a.rating; // 임시로 평점 기준
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
          <Card key={store.id} className="store-card" sx={{ mb: 2 }}>
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