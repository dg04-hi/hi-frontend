import React, { useState, createContext, useContext } from 'react';
import { BottomNavigation, BottomNavigationAction, Select, MenuItem, FormControl, Box } from '@mui/material';
import { 
  Analytics, 
  Store, 
  Person,
  Home
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

// 매장 선택 Context 생성
const SelectedStoreContext = createContext();

export const useSelectedStore = () => {
  const context = useContext(SelectedStoreContext);
  if (!context) {
    return { selectedStoreId: 1, setSelectedStoreId: () => {} };
  }
  return context;
};

export const SelectedStoreProvider = ({ children }) => {
  const [selectedStoreId, setSelectedStoreId] = useState(1);
  
  return (
    <SelectedStoreContext.Provider value={{ selectedStoreId, setSelectedStoreId }}>
      {children}
    </SelectedStoreContext.Provider>
  );
};

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
  const { selectedStoreId, setSelectedStoreId } = useSelectedStore();
  
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

  const handleStoreChange = (newStoreId) => {
    setSelectedStoreId(newStoreId);
    
    // 현재 페이지에 따라 적절한 URL로 이동 (대시보드도 매장 ID 포함)
    if (location.pathname.includes('/owner/dashboard')) {
      navigate(`/owner/dashboard/${newStoreId}`);
    } else if (location.pathname.includes('/owner/store') && location.pathname.includes('/management')) {
      navigate(`/owner/store/${newStoreId}/management`);
    } else if (location.pathname.includes('/owner/analytics')) {
      navigate(`/owner/analytics/${newStoreId}`);
    } else if (location.pathname.includes('/owner/action-plan')) {
      navigate(`/owner/action-plan/${newStoreId}`);
    }
  };

  return (
    <>
      {/* 모바일 기준 매장 선택 드롭다운 */}
      <Box 
        sx={{ 
          position: 'fixed', 
          top: 8, 
          right: 8, 
          zIndex: 1000,
          bgcolor: 'rgba(255,255,255,0.95)',
          borderRadius: 1,
          padding: '4px 8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          maxWidth: '140px'
        }}
      >
        <FormControl size="small" sx={{ minWidth: 100 }}>
          <Select
            value={selectedStoreId}
            onChange={(e) => handleStoreChange(e.target.value)}
            displayEmpty
            variant="standard"
            sx={{ 
              fontSize: '11px',
              '& .MuiSelect-select': {
                padding: '4px 24px 4px 8px',
                fontSize: '11px'
              }
            }}
          >
            {stores.map((store) => (
              <MenuItem key={store.id} value={store.id} sx={{ fontSize: '12px' }}>
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
              navigate(`/owner/dashboard/${selectedStoreId}`);
              break;
            case 1:
              navigate(`/owner/store/${selectedStoreId}/management`);
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