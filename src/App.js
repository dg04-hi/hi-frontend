//* src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { SelectedStoreProvider } from './components/common/Navigation';
import './App.css';

// 기존 import들...
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import FindAccount from './pages/auth/FindAccount';
import CustomerMain from './pages/customer/CustomerMain';
import StoreDetail from './pages/customer/StoreDetail';
import ReviewWrite from './pages/customer/ReviewWrite';
import MyReviews from './pages/customer/MyReviews';
import MyPage from './pages/customer/MyPage';
import PreferenceSettings from './pages/customer/PreferenceSettings';
import ProfileEdit from './pages/customer/ProfileEdit';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import StoreList from './pages/owner/StoreList';
import StoreManagement from './pages/owner/StoreManagement';
import StoreInfo from './pages/owner/StoreInfo'; // 새로 추가
import StoreRegister from './pages/owner/StoreRegister'; // 새로 추가
import MenuManagement from './pages/owner/MenuManagement';
import ReviewManagement from './pages/owner/ReviewManagement';
import ExternalIntegration from './pages/owner/ExternalIntegration';
import SubscriptionManagement from './pages/owner/SubscriptionManagement';
import AnalyticsDetail from './pages/owner/AnalyticsDetail';
import ActionPlan from './pages/owner/ActionPlan';
import OwnerMyPage from './pages/owner/OwnerMyPage';

function App() {
  return (
    <AuthProvider>
      <SelectedStoreProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/find-account" element={<FindAccount />} />
              
              {/* Customer Routes */}
              <Route path="/customer/main" element={<CustomerMain />} />
              <Route path="/customer/store/:storeId" element={<StoreDetail />} />
              <Route path="/customer/review/write/:storeId" element={<ReviewWrite />} />
              <Route path="/customer/my-reviews" element={<MyReviews />} />
              <Route path="/customer/mypage" element={<MyPage />} />
              <Route path="/customer/preferences" element={<PreferenceSettings />} />
              <Route path="/customer/profile" element={<ProfileEdit />} />
              
              {/* Owner Routes */}
              <Route path="/owner/dashboard" element={<Navigate to="/owner/dashboard/1" replace />} />
              <Route path="/owner/dashboard/:storeId" element={<OwnerDashboard />} />
              <Route path="/owner/stores" element={<StoreList />} />
              <Route path="/owner/store/register" element={<StoreRegister />} /> {/* 새로 추가 */}
              <Route path="/owner/store/:storeId/management" element={<StoreManagement />} />
              <Route path="/owner/store/:storeId/info" element={<StoreInfo />} /> {/* 새로 추가 */}
              <Route path="/owner/store/:storeId/menu" element={<MenuManagement />} />
              <Route path="/owner/store/:storeId/reviews" element={<ReviewManagement />} />
              <Route path="/owner/external" element={<ExternalIntegration />} />
              <Route path="/owner/subscription" element={<SubscriptionManagement />} />
              <Route path="/owner/analytics/:storeId" element={<AnalyticsDetail />} />
              <Route path="/owner/action-plan/:storeId" element={<ActionPlan />} />
              <Route path="/owner/mypage" element={<OwnerMyPage />} />
              
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </SelectedStoreProvider>
    </AuthProvider>
  );
}

export default App;