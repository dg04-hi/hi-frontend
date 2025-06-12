import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider
} from '@mui/material';
import { 
  Person, 
  Favorite, 
  Settings, 
  ExitToApp,
  ChevronRight 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CustomerNavigation } from '../../components/common/Navigation';
import { useAuth } from '../../hooks/useAuth';

const MyPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box className="mobile-container">
      {/* 헤더 */}
      <Box sx={{ p: 2, bgcolor: '#f39c12', color: 'white' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          마이페이지
        </Typography>
      </Box>

      <Box className="content-area">
        {/* 프로필 섹션 */}
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Avatar sx={{ width: 80, height: 80, margin: '0 auto', mb: 2 }}>
            {user?.nickname?.[0] || 'U'}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {user?.nickname || '사용자'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.username || 'user@example.com'}
          </Typography>
        </Box>

        <Divider />

        {/* 메뉴 리스트 */}
        <List>
          <ListItem 
            button 
            onClick={() => navigate('/customer/profile')}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText 
              primary="회원정보 수정"
              secondary="닉네임, 아이디, 비밀번호 변경"
            />
            <ChevronRight />
          </ListItem>

          <ListItem 
            button 
            onClick={() => navigate('/customer/preferences')}
          >
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText 
              primary="취향 설정"
              secondary="선호하는 음식 종류와 분위기 설정"
            />
            <ChevronRight />
          </ListItem>

          <Divider />

          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="로그아웃" />
          </ListItem>
        </List>
      </Box>

      <CustomerNavigation />
    </Box>
  );
};

export default MyPage;