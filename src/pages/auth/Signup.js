import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import { memberService } from '../../services/member';
import { validateUsername, validatePassword, validateNickname } from '../../utils/validation';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usernameChecked, setUsernameChecked] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    
    if (e.target.name === 'username') {
      setUsernameChecked(false);
    }
  };

  const checkUsername = async () => {
    if (!validateUsername(formData.username)) {
      setError('아이디는 영문/숫자 8-20자여야 합니다.');
      return;
    }

    try {
      await memberService.checkUsernameAvailability(formData.username);
      setUsernameChecked(true);
      setError('');
    } catch (error) {
      setError('이미 사용중인 아이디입니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!validateUsername(formData.username)) {
      setError('아이디는 영문/숫자 8-20자여야 합니다.');
      return;
    }

    if (!usernameChecked) {
      setError('아이디 중복확인을 해주세요.');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('비밀번호는 영문, 특수문자 포함 8-20자여야 합니다.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!validateNickname(formData.nickname)) {
      setError('닉네임은 20자 이하여야 합니다.');
      return;
    }

    setLoading(true);
    try {
      await memberService.register({
        username: formData.username,
        password: formData.password,
        nickname: formData.nickname,
        phoneNumber: formData.phoneNumber
      });
      
      navigate('/customer/preferences');
    } catch (error) {
      setError(error.response?.data?.message || '회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="mobile-container">
      <Header title="회원가입" />
      
      <Box className="content-area">
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              name="username"
              label="아이디"
              value={formData.username}
              onChange={handleInputChange}
              sx={{ flex: 1 }}
              helperText="영문/숫자 8-20자"
            />
            <Button
              variant="contained"
              size="small"
              onClick={checkUsername}
              sx={{ mt: 1 }}
            >
              중복
            </Button>
          </Box>

          <TextField
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            margin="normal"
            helperText="영문, 특수문자 포함 8-20자"
          />

          <TextField
            fullWidth
            name="confirmPassword"
            label="비밀번호 확인"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="nickname"
            label="닉네임"
            value={formData.nickname}
            onChange={handleInputChange}
            margin="normal"
            helperText="20자 이하"
          />

          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <TextField
              name="phoneNumber"
              label="전화번호"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              size="small"
              color="success"
              sx={{ mt: 1 }}
            >
              인증요청
            </Button>
          </Box>

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
            sx={{ mt: 3, height: 48 }}
          >
            {loading ? <CircularProgress size={24} /> : '회원가입'}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
