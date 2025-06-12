//* src/pages/owner/StoreRegister.js
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import { OwnerNavigation } from '../../components/common/Navigation';

const StoreRegister = () => {
  const navigate = useNavigate();
  const [storeInfo, setStoreInfo] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    operatingHours: '',
    category: '',
    tags: []
  });

  const categories = [
    '한식', '중식', '일식', '양식', '분식', '치킨', '피자', 
    '햄버거', '카페', '디저트', '기타'
  ];

  const handleInputChange = (e) => {
    setStoreInfo({
      ...storeInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = () => {
    // 필수 필드 검증
    if (!storeInfo.name || !storeInfo.address || !storeInfo.category) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    console.log('매장 등록:', storeInfo);
    alert('매장이 성공적으로 등록되었습니다!');
    navigate('/owner/stores');
  };

  return (
    <Box className="mobile-container">
      <Header title="매장 등록" onBack={() => navigate(-1)} />
      
      <Box className="content-area">
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              새 매장 등록
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="매장명 *"
                  name="name"
                  value={storeInfo.name}
                  onChange={handleInputChange}
                  placeholder="매장 이름을 입력하세요"
                />
              </Grid>
              
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  label="주소 *"
                  name="address"
                  value={storeInfo.address}
                  onChange={handleInputChange}
                  placeholder="주소를 검색하세요"
                />
              </Grid>
              
              <Grid item xs={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ height: '56px' }}
                  onClick={() => alert('주소검색 기능 (추후 구현)')}
                >
                  주소검색
                </Button>
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>카테고리 *</InputLabel>
                  <Select
                    name="category"
                    value={storeInfo.category}
                    onChange={handleInputChange}
                    label="카테고리 *"
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
                  placeholder="02-1234-5678"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="운영시간"
                  name="operatingHours"
                  value={storeInfo.operatingHours}
                  onChange={handleInputChange}
                  placeholder="11:00 - 22:00"
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
                  placeholder="매장을 소개해주세요"
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 2, p: 2, bgcolor: '#fff8e8', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                ✨ 매장 등록 후 메뉴와 사진을 추가할 수 있어요
              </Typography>
            </Box>
            
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleRegister}
              sx={{ mt: 3 }}
            >
              🏪 매장 등록하기
            </Button>
          </CardContent>
        </Card>
      </Box>

      <OwnerNavigation />
    </Box>
  );
};

export default StoreRegister;