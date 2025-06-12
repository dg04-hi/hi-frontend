import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Select, MenuItem, FormControl, Box, Typography } from '@mui/material';
import { 
  Analytics, 
  Store, 
  Person,
  Home,
  ArrowDropDown
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const CustomerNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getValue = () => {
    if (location.pathname.includes('/customer/main')) return 0;
    if (location.pathname.includes('/customer/mypage')) return 1;
    return 0;
  };

  return (
    <BottomNavigation
      className="bottom-navigation"
      value={getValue()}
      onChange={(event, newValue) => {
        switch (newValue) {
          case 0:
            navigate('/customer/main');
            break;
          case 1:
            navigate('/customer/mypage');
            break;
          default:
            break;
        }
      }}
    >
      <BottomNavigationAction label="홈" icon={<Home />} />
      <BottomNavigationAction label="마이페이지" icon={<Person />} />
    </BottomNavigation>
  );
};

const OwnerNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedStore, setSelectedStore] = useState('분식천국');
  
  const getValue = () => {
    if (location.pathname.includes('/owner/dashboard')) return 0;
    if (location.pathname.includes('/owner/store') && location.pathname.includes('/management')) return 1;
    if (location.pathname.includes('/owner/mypage')) return 2;
    return 0;
  };

  const stores = [
    { id: 1, name: '분식천국' },
    { id: 2, name: '맛있는 한식당' }
  ];

  return (
    <>
      {/* 매장 선택 드롭다운 */}
      <Box 
        sx={{ 
          position: 'fixed', 
          top: 16, 
          right: 16, 
          zIndex: 1000,
          bgcolor: 'rgba(255,255,255,0.9)',
          borderRadius: 1,
          p: 1
        }}
      >
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            displayEmpty
            sx={{ fontSize: '12px' }}
          >
            {stores.map((store) => (
              <MenuItem key={store.id} value={store.name}>
                {store.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <BottomNavigation
        className="bottom-navigation"
        value={getValue()}
        onChange={(event, newValue) => {
          switch (newValue) {
            case 0:
              navigate('/owner/dashboard');
              break;
            case 1:
              navigate('/owner/store/1/management');
              break;
            case 2:
              navigate('/owner/mypage');
              break;
            default:
              break;
          }
        }}
      >
        <BottomNavigationAction label="분석" icon={<Analytics />} />
        <BottomNavigationAction label="매장관리" icon={<Store />} />
        <BottomNavigationAction label="마이페이지" icon={<Person />} />
      </BottomNavigation>
    </>
  );
};

export { CustomerNavigation, OwnerNavigation };