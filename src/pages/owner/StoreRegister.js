import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import { OwnerNavigation } from '../../components/common/Navigation';

const StoreRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    operatingHours: '',
    closedDays: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.address || !formData.phone) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    
    // Mock API 호출
    setTimeout(() => {
      console.log('매장 등록:', formData);
      alert('매장이 성공적으로 등록되었습니다!');
      navigate('/owner/stores');
    }, 2000);
  };

  return (
    <Box className="mobile-container">
      <Header title="매장 등록" />
      
      <Box className="content-area">
        <Alert severity="info" sx={{ mb: 2 }}>
          새로운 매장 정보를 입력해주세요. *는 필수 항목입니다.
        </Alert>

        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="매장명 *"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="업종/카테고리"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="예: 한식, 분식, 카페 등"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="매장 소개"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    placeholder="매장을 소개하는 글을 작성해주세요"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="주소 *"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="도로명 주소를 입력해주세요"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="전화번호 *"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="02-1234-5678"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="운영시간"
                    name="operatingHours"
                    value={formData.operatingHours}
                    onChange={handleInputChange}
                    placeholder="예: 11:00 - 22:00"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="휴무일"
                    name="closedDays"
                    value={formData.closedDays}
                    onChange={handleInputChange}
                    placeholder="예: 매주 일요일"
                  />
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3 }}
              >
                {loading ? '등록 중...' : '매장 등록하기'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>

      <OwnerNavigation />
    </Box>
  );
};

export default StoreRegister;