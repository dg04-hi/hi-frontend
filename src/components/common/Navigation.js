import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { 
  Analytics, 
  Store, 
  RateReview, 
  Link, 
  Subscriptions,
  Home,
  Person,
  Search 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const CustomerNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getValue = () => {
    if (location.pathname.includes('/customer/main')) return 0;
    if (location.pathname.includes('/customer/my-reviews')) return 1;
    if (location.pathname.includes('/customer/mypage')) return 2;
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
            navigate('/customer/my-reviews');
            break;
          case 2:
            navigate('/customer/mypage');
            break;
          default:
            break;
        }
      }}
    >
      <BottomNavigationAction label="홈" icon={<Home />} />
      <BottomNavigationAction label="내 리뷰" icon={<RateReview />} />
      <BottomNavigationAction label="마이페이지" icon={<Person />} />
    </BottomNavigation>
  );
};

const OwnerNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getValue = () => {
    if (location.pathname.includes('/owner/dashboard')) return 0;
    if (location.pathname.includes('/owner/store')) return 1;
    if (location.pathname.includes('/owner/review')) return 2;
    if (location.pathname.includes('/owner/external')) return 3;
    if (location.pathname.includes('/owner/subscription')) return 4;
    return 0;
  };

  return (
    <BottomNavigation
      className="bottom-navigation"
      value={getValue()}
      onChange={(event, newValue) => {
        switch (newValue) {
          case 0:
            navigate('/owner/dashboard');
            break;
          case 1:
            navigate('/owner/stores');
            break;
          case 2:
            navigate('/owner/store/1/reviews'); // 임시로 storeId 1 사용
            break;
          case 3:
            navigate('/owner/external');
            break;
          case 4:
            navigate('/owner/subscription');
            break;
          default:
            break;
        }
      }}
    >
      <BottomNavigationAction label="분석" icon={<Analytics />} />
      <BottomNavigationAction label="매장" icon={<Store />} />
      <BottomNavigationAction label="리뷰" icon={<RateReview />} />
      <BottomNavigationAction label="연동" icon={<Link />} />
      <BottomNavigationAction label="구독" icon={<Subscriptions />} />
    </BottomNavigation>
  );
};

export { CustomerNavigation, OwnerNavigation };
