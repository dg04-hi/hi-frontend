import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Alert
} from '@mui/material';
import Header from '../../components/common/Header';
import { memberService } from '../../services/member';
import { validateUsername, validatePassword, validateNickname } from '../../utils/validation';

const ProfileEdit = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    nickname: '',
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setMessage('');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setMessage('');
  };

  const handleNicknameUpdate = async () => {
    if (!validateNickname(formData.nickname)) {
      setMessage('닉네임은 20자 이하여야 합니다.');
      return;
    }

    setLoading(true);
    try {
      await memberService.updateNickname(formData.nickname);
      setMessage('닉네임이 변경되었습니다.');
    } catch (error) {
      setMessage(error.response?.data?.message || '닉네임 변경에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameUpdate = async () => {
    if (!validateUsername(formData.username)) {
      setMessage('아이디는 영문/숫자 8-20자여야 합니다.');
      return;
    }

    setLoading(true);
    try {
      await memberService.updateUsername(formData.username);
      setMessage('아이디가 변경되었습니다.');
    } catch (error) {
      setMessage(error.response?.data?.message || '아이디 변경에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!validatePassword(formData.newPassword)) {
      setMessage('비밀번호는 영문, 특수문자 포함 8-20자여야 합니다.');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    try {
      await memberService.updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      setMessage('비밀번호가 변경되었습니다.');
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage(error.response?.data?.message || '비밀번호 변경에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="mobile-container">
      <Header title="회원정보 수정" />
      
      <Box className="content-area">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="닉네임" />
          <Tab label="아이디" />
          <Tab label="비밀번호" />
        </Tabs>

        {/* 닉네임 변경 */}
        {tabValue === 0 && (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              닉네임 변경
            </Typography>
            <TextField
              fullWidth
              name="nickname"
              label="새 닉네임"
              value={formData.nickname}
              onChange={handleInputChange}
              placeholder="20자 이하로 입력해주세요"
              margin="normal"
              helperText="20자 이하"
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleNicknameUpdate}
              disabled={loading || !formData.nickname}
              sx={{ mt: 2 }}
            >
              닉네임 변경
            </Button>
          </Box>
        )}

        {/* 아이디 변경 */}
        {tabValue === 1 && (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              아이디 변경
            </Typography>
            <TextField
              fullWidth
              name="username"
              label="새 아이디"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="영문/숫자 8-20자"
              margin="normal"
              helperText="영문/숫자 8-20자"
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleUsernameUpdate}
              disabled={loading || !formData.username}
              sx={{ mt: 2 }}
            >
              아이디 변경
            </Button>
          </Box>
        )}

        {/* 비밀번호 변경 */}
        {tabValue === 2 && (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              비밀번호 변경
            </Typography>
            <TextField
              fullWidth
              name="currentPassword"
              label="현재 비밀번호"
              type="password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="newPassword"
              label="새 비밀번호"
              type="password"
              value={formData.newPassword}
              onChange={handleInputChange}
              margin="normal"
              helperText="영문, 특수문자 포함 8-20자"
            />
            <TextField
              fullWidth
              name="confirmPassword"
              label="새 비밀번호 확인"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              margin="normal"
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handlePasswordUpdate}
              disabled={loading || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
              sx={{ mt: 2 }}
            >
              비밀번호 변경
            </Button>
          </Box>
        )}

        {message && (
          <Alert 
            severity={message.includes('실패') || message.includes('일치하지') ? 'error' : 'success'} 
            sx={{ mt: 2 }}
          >
            {message}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default ProfileEdit;
