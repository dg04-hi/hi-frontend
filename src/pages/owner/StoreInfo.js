//* src/pages/owner/StoreInfo.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import { OwnerNavigation } from '../../components/common/Navigation';

const StoreInfo = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [storeInfo, setStoreInfo] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    operatingHours: '',
    closedDays: '',
    category: '',
    tags: []
  });

  // 사용 가능한 태그 목록
  const availableTags = [
    // 음식 카테고리
    '한식', '중식', '일식', '양식', '분식', '카페', '치킨', '피자', '햄버거', '디저트',
    // 알레르기/건강 정보
    '비건', '글루텐프리', '저염', '저칼로리', '유기농', '할랄',
    // 분위기/서비스
    '혼밥', '데이트', '가족모임', '회식', '분위기좋은', '조용한', '넓은',
    // 편의사항
    '반려동물동반', '주차가능', '배달가능', '포장가능', '예약가능', '카드결제',
    // 운영시간
    '24시간', '늦은시간', '아침일찍', '점심특화', '저녁특화',
    // 가격대
    '가성비', '저렴한', '고급', '세트메뉴',
    // 청결/인증
    '세스코인증', '청결한', 'HACCP인증'
  ];

  const categories = [
    '한식', '중식', '일식', '양식', '분식', '치킨', '피자', 
    '햄버거', '카페', '디저트', '기타'
  ];

  const mockStoreInfo = {
    name: '분식천국',
    description: '신선한 재료로 만든 맛있는 분식을 제공합니다.',
    address: '서울 강남구 역삼동 123-45',
    phone: '02-1234-5678',
    operatingHours: '11:00 - 22:00',
    closedDays: '매주 일요일',
    category: '분식',
    tags: ['분식', '가성비', '혼밥', '배달가능']
  };

  useEffect(() => {
    setStoreInfo(mockStoreInfo);
  }, [storeId]);

  const handleInputChange = (e) => {
    setStoreInfo({
      ...storeInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleTagClick = (tag) => {
    setStoreInfo(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleTagDelete = (tagToDelete) => {
    setStoreInfo(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToDelete)
    }));
  };

  const handleSave = () => {
    console.log('매장 정보 저장:', storeInfo);
    alert('매장 정보가 저장되었습니다.');
  };

  return (
    <Box className="mobile-container">
      <Header title="매장 정보 관리" onBack={() => navigate(-1)} />
      
      <Box className="content-area">
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              기본 정보
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="매장명"
                  name="name"
                  value={storeInfo.name}
                  onChange={handleInputChange}
                />
              </Grid>
              
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  label="주소"
                  name="address"
                  value={storeInfo.address}
                  onChange={handleInputChange}
                />
              </Grid>
              
              <Grid item xs={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ height: '56px' }}
                  onClick={() => alert('주소검색 기능 (추후 구현)')}
                >
                  검색
                </Button>
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>카테고리</InputLabel>
                  <Select
                    name="category"
                    value={storeInfo.category}
                    onChange={handleInputChange}
                    label="카테고리"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="전화번호"
                  name="phone"
                  value={storeInfo.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="운영시간"
                  name="operatingHours"
                  value={storeInfo.operatingHours}
                  onChange={handleInputChange}
                  placeholder="예: 11:00 - 22:00"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="휴무일"
                  name="closedDays"
                  value={storeInfo.closedDays}
                  onChange={handleInputChange}
                  placeholder="예: 매주 일요일"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="매장 소개"
                  name="description"
                  value={storeInfo.description}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>

            {/* 매장 태그 섹션 */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
              매장 태그
            </Typography>

            {/* 선택된 태그 표시 */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              선택된 태그 ({storeInfo.tags.length}개)
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, minHeight: 40 }}>
              {storeInfo.tags.length > 0 ? (
                storeInfo.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleTagDelete(tag)}
                    color="primary"
                    size="small"
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
                  아래에서 태그를 선택해주세요
                </Typography>
              )}
            </Box>

            {/* 사용 가능한 태그 목록 */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              사용 가능한 태그 (클릭하여 선택)
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1, 
              maxHeight: 200, 
              overflowY: 'auto',
              p: 2,
              border: '1px solid #ddd',
              borderRadius: 1,
              bgcolor: '#fafafa'
            }}>
              {availableTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  clickable
                  variant={storeInfo.tags.includes(tag) ? "filled" : "outlined"}
                  color={storeInfo.tags.includes(tag) ? "primary" : "default"}
                  onClick={() => handleTagClick(tag)}
                  size="small"
                />
              ))}
            </Box>

            <Box sx={{ mt: 2, p: 2, bgcolor: '#e8f4fd', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                💡 태그는 고객이 매장을 찾을 때 도움이 됩니다. 매장의 특징을 잘 나타내는 태그를 선택해주세요.
              </Typography>
            </Box>
            
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSave}
              sx={{ mt: 3 }}
            >
              저장하기
            </Button>
          </CardContent>
        </Card>
      </Box>

      <OwnerNavigation />
    </Box>
  );
};

export default StoreInfo;