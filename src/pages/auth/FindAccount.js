import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import Header from '../../components/common/Header';

const FindAccount = () => {
  const [tabValue, setTabValue] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [foundUsername, setFoundUsername] = useState('');
  const [step, setStep] = useState('input'); // input, verify, result

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setStep('input');
    setFoundUsername('');
  };

  const handleSendCode = () => {
    if (!phoneNumber) return;
    setStep('verify');
  };

  const handleVerify = () => {
    if (!verificationCode) return;
    // Mock verification
    setFoundUsername('ki***er');
    setStep('result');
  };

  return (
    <Box className="mobile-container">
      <Header title="계정 찾기" />
      
      <Box className="content-area">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="아이디 찾기" />
          <Tab label="비밀번호 찾기" />
        </Tabs>

        {step === 'input' && (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              가입시 등록한 전화번호를 입력해주세요.
            </Typography>
            
            <TextField
              fullWidth
              label="전화번호"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="010-1234-5678"
              margin="normal"
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleSendCode}
              sx={{ mt: 2 }}
              disabled={!phoneNumber}
            >
              인증번호 전송
            </Button>
          </>
        )}

        {step === 'verify' && (
          <>
            <Alert severity="info" sx={{ mb: 2 }}>
              {phoneNumber}로 인증번호를 전송했습니다.
            </Alert>
            
            <TextField
              fullWidth
              label="인증번호"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="6자리 숫자"
              margin="normal"
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleVerify}
              sx={{ mt: 2 }}
              disabled={!verificationCode}
            >
              확인
            </Button>
          </>
        )}

        {step === 'result' && tabValue === 0 && (
          <>
            <Alert severity="success" sx={{ mb: 2 }}>
              ✅ 아이디를 찾았습니다!
            </Alert>
            
            <Typography variant="body1" sx={{ mb: 1 }}>
              아이디: {foundUsername}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              (2024.01.15 가입)
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
              💡 보안을 위해 아이디의 일부만 표시됩니다
            </Alert>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                sx={{ flex: 1 }}
                onClick={() => window.location.href = '/login'}
              >
                로그인하기
              </Button>
              <Button
                variant="outlined"
                sx={{ flex: 1 }}
                onClick={() => setTabValue(1)}
              >
                비밀번호 찾기
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default FindAccount;
