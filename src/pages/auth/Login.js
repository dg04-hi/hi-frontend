import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userType, setUserType] = useState(USER_ROLES.CUSTOMER);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTabChange = (event, newValue) => {
    setUserType(newValue);
    setError('');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    const result = await login(formData.username, formData.password, userType);
    setLoading(false);

    if (result.success) {
      if (result.user.userType === USER_ROLES.CUSTOMER) {
        navigate('/customer/main');
      } else {
        navigate('/owner/dashboard');
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <Box className="mobile-container">
      <Box sx={{ p: 3, mt: 4 }}>
        {/* 로고 */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f39c12' }}>
            HiOrder
          </Typography>
          <Typography variant="body2" color="text.secondary">
            AI 기반 리뷰 분석 서비스
          </Typography>
        </Box>

        {/* 사용자 타입 선택 */}
        <Tabs
          value={userType}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="🛍️ 고객" value={USER_ROLES.CUSTOMER} />
          <Tab label="🏪 점주" value={USER_ROLES.OWNER} />
        </Tabs>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="username"
            label="아이디"
            value={formData.username}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          
          <TextField
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3, mb: 2, height: 48 }}
          >
            {loading ? <CircularProgress size={24} /> : '로그인'}
          </Button>
        </form>

        {/* 하단 링크 */}
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            variant="text"
            size="small"
            onClick={() => navigate('/find-account')}
          >
            아이디 찾기
          </Button>
          <Typography variant="body2" component="span" sx={{ mx: 1 }}>
            |
          </Typography>
          <Button
            variant="text"
            size="small"
            onClick={() => navigate('/find-account')}
          >
            비밀번호 찾기
          </Button>
        </Box>

        <Button
          fullWidth
          variant="outlined"
          onClick={() => navigate('/signup')}
          sx={{ mt: 2 }}
        >
          회원가입
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
