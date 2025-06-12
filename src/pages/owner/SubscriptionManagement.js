//* src/pages/owner/SubscriptionManagement.js
import React, { useState, useEffect } from 'react';
import {
 Box,
 Typography,
 Card,
 CardContent,
 Button,
 Chip,
 List,
 ListItem,
 ListItemIcon,
 ListItemText,
 Alert
} from '@mui/material';
import { Check, Star, TrendingUp } from '@mui/icons-material';
import Header from '../../components/common/Header';
import { OwnerNavigation } from '../../components/common/Navigation';
import { formatNumber } from '../../utils/helpers';

const SubscriptionManagement = () => {
 const [currentPlan, setCurrentPlan] = useState(null);
 const [availablePlans, setAvailablePlans] = useState([]);

 const mockCurrentPlan = {
   id: 'basic',
   name: '베이직 플랜',
   price: 29000,
   remainingDays: 15,
   benefits: [
     'AI 피드백 월 10회',
     '리뷰 분석 리포트',
     '외부 플랫폼 연동',
     '기본 통계 분석'
   ],
   improvements: {
     revenue: 12.5,
     satisfaction: 8.3
   }
 };

 const mockPlans = [
   {
     id: 'free',
     name: '무료 플랜',
     price: 0,
     description: '기본 기능만 제공',
     features: [
       '월 3회 AI 피드백',
       '기본 리뷰 관리',
       '1개 플랫폼 연동'
     ],
     recommended: false
   },
   {
     id: 'basic',
     name: '베이직 플랜',
     price: 29000,
     description: '소상공인을 위한 필수 기능',
     features: [
       'AI 피드백 월 10회',
       '리뷰 분석 리포트',
       '외부 플랫폼 연동',
       '기본 통계 분석',
       '실행 계획 제공'
     ],
     recommended: true
   },
   {
     id: 'premium',
     name: '프리미엄 플랜',
     price: 59000,
     description: '모든 기능을 무제한으로',
     features: [
       'AI 피드백 무제한',
       '고급 분석 리포트',
       '모든 플랫폼 연동',
       '실시간 모니터링',
       '맞춤형 컨설팅',
       '우선 고객지원'
     ],
     recommended: false
   }
 ];

 useEffect(() => {
   setCurrentPlan(mockCurrentPlan);
   setAvailablePlans(mockPlans);
 }, []);

 const handleChangePlan = (planId) => {
   console.log('구독 변경:', planId);
 };

 const handleRenew = () => {
   console.log('구독 갱신');
 };

 return (
   <Box className="mobile-container">
     <Header title="구독 관리" />
     
     <Box className="content-area">
       {/* 현재 구독 정보 */}
       {currentPlan && (
         <Card sx={{ mb: 3 }}>
           <CardContent>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
               <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                 현재 구독
               </Typography>
               <Chip label={currentPlan.name} color="primary" />
             </Box>

             <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
               월 {formatNumber(currentPlan.price)}원
             </Typography>
             
             <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
               남은 구독일: {currentPlan.remainingDays}일
             </Typography>

             {/* 구독 혜택 */}
             <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
               포함된 기능
             </Typography>
             <List dense>
               {currentPlan.benefits.map((benefit, index) => (
                 <ListItem key={index} sx={{ pl: 0 }}>
                   <ListItemIcon sx={{ minWidth: 24 }}>
                     <Check fontSize="small" color="success" />
                   </ListItemIcon>
                   <ListItemText primary={benefit} />
                 </ListItem>
               ))}
             </List>

             {/* 성과 정보 */}
             <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
               <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                 구독으로 얻은 성과
               </Typography>
               <Typography variant="body2">
                 • 매출 증가: +{currentPlan.improvements.revenue}%
               </Typography>
               <Typography variant="body2">
                 • 고객 만족도: +{currentPlan.improvements.satisfaction}%
               </Typography>
             </Alert>

             <Button
               fullWidth
               variant="contained"
               onClick={handleRenew}
             >
               구독 갱신하기
             </Button>
           </CardContent>
         </Card>
       )}

       {/* 구독 플랜 변경 */}
       <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
         다른 플랜 보기
       </Typography>

       {availablePlans.map((plan) => (
         <Card 
           key={plan.id} 
           sx={{ 
             mb: 2,
             border: plan.recommended ? '2px solid #f39c12' : '1px solid #e0e0e0',
             position: 'relative'
           }}
         >
           {plan.recommended && (
             <Chip
               label="추천"
               color="warning"
               size="small"
               icon={<Star />}
               sx={{
                 position: 'absolute',
                 top: -10,
                 right: 16,
                 zIndex: 1
               }}
             />
           )}
           
           <CardContent>
             <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
               {plan.name}
             </Typography>
             
             <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
               {plan.price === 0 ? '무료' : `월 ${formatNumber(plan.price)}원`}
             </Typography>
             
             <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
               {plan.description}
             </Typography>

             <List dense>
               {plan.features.map((feature, index) => (
                 <ListItem key={index} sx={{ pl: 0 }}>
                   <ListItemIcon sx={{ minWidth: 24 }}>
                     <Check fontSize="small" color="success" />
                   </ListItemIcon>
                   <ListItemText primary={feature} />
                 </ListItem>
               ))}
             </List>

             {currentPlan?.id !== plan.id && (
               <Button
                 fullWidth
                 variant={plan.recommended ? 'contained' : 'outlined'}
                 onClick={() => handleChangePlan(plan.id)}
                 sx={{ mt: 2 }}
               >
                 {plan.price > (currentPlan?.price || 0) ? '업그레이드' : '변경하기'}
               </Button>
             )}

             {currentPlan?.id === plan.id && (
               <Chip
                 label="현재 플랜"
                 color="primary"
                 sx={{ mt: 2, width: '100%' }}
               />
             )}
           </CardContent>
         </Card>
       ))}

       {/* 구독 안내 */}
       <Alert severity="info" sx={{ mt: 2 }}>
         💡 구독 변경 시 현재 구독 잔여일이 새 구독에 반영됩니다.
       </Alert>
     </Box>

     <OwnerNavigation />
   </Box>
 );
};

export default SubscriptionManagement;