//* src/pages/owner/StoreInfo.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid
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
    closedDays: ''
  });

  const mockStoreInfo = {
    name: '분식천국',
    description: '신선한 재료로 만든 맛있는 분식을 제공합니다.',
    address: '서울 강남구 역삼동 123-45',
    phone: '02-1234-5678',
    operatingHours: '11:00 - 22:00',
    closedDays: '매주 일요일'
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
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="주소"
                  name="address"
                  value={storeInfo.address}
                  onChange={handleInputChange}
                />
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
            </Grid>
            
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