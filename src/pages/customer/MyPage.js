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

export default MyPage;//* package.json
{
  "name": "hi-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.14.19",
    "@mui/material": "^5.14.20",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.18.0",
    "react-scripts": "5.0.1",
    "recharts": "^2.8.0",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:8080"
}
