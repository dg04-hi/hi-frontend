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
  Subscriptions,
  Store,
  ExitToApp,
  ChevronRight 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { OwnerNavigation } from '../../components/common/Navigation';
import { useAuth } from '../../hooks/useAuth';

const OwnerMyPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box className="mobile-container">
      {/* 헤더 */}
      <Box sx={{ p: 2, bgcolor: '#2c3e50', color: 'white' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          점주 마이페이지
        </Typography>
      </Box>

      <Box className="content-area">
        {/* 프로필 섹션 */}
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Avatar sx={{ width: 80, height: 80, margin: '0 auto', mb: 2 }}>
            {user?.nickname?.[0] || 'O'}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {user?.nickname || '점주'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            사업자
          </Typography>
        </Box>

        <Divider />

        {/* 메뉴 리스트 */}
        <List>
          <ListItem 
            button 
            onClick={() => navigate('/owner/subscription')}
          >
            <ListItemIcon>
              <Subscriptions />
            </ListItemIcon>
            <ListItemText 
              primary="구독 관리"
              secondary="구독 플랜 확인 및 변경"
            />
            <ChevronRight />
          </ListItem>

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
            onClick={() => navigate('/owner/stores')}
          >
            <ListItemIcon>
              <Store />
            </ListItemIcon>
            <ListItemText 
              primary="내 매장 목록"
              secondary="등록된 매장 관리"
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

      <OwnerNavigation />
    </Box>
  );
};

export default OwnerMyPage;