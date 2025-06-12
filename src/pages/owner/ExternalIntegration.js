//* src/pages/owner/ExternalIntegration.js
import React, { useState, useEffect } from 'react';
import {
 Box,
 Typography,
 Card,
 CardContent,
 Button,
 Chip,
 Alert
} from '@mui/material';
import { Sync, Link, LinkOff } from '@mui/icons-material';
import Header from '../../components/common/Header';
import { OwnerNavigation } from '../../components/common/Navigation';

const ExternalIntegration = () => {
 const [platforms, setPlatforms] = useState([]);
 const [syncing, setSyncing] = useState(false);

 const mockPlatforms = [
   {
     id: 'naver',
     name: '네이버 플레이스',
     icon: 'N',
     iconColor: '#1ec800',
     connected: true,
     connectedDate: '2024.05.15',
     lastSync: '2시간 전',
     reviewCount: 23
   },
   {
     id: 'kakao',
     name: '카카오맵',
     icon: 'K',
     iconColor: '#ffcd00',
     connected: true,
     connectedDate: '2024.05.20',
     lastSync: '1시간 전',
     reviewCount: 18
   },
   {
     id: 'google',
     name: '구글 마이비즈니스',
     icon: 'G',
     iconColor: '#db4437',
     connected: false,
     connectedDate: null,
     lastSync: null,
     reviewCount: 0
   }
 ];

 useEffect(() => {
   setPlatforms(mockPlatforms);
 }, []);

 const handleConnect = (platformId) => {
   setPlatforms(prev => prev.map(platform => 
     platform.id === platformId 
       ? { 
           ...platform, 
           connected: true, 
           connectedDate: new Date().toLocaleDateString('ko-KR'),
           lastSync: '방금 전'
         }
       : platform
   ));
 };

 const handleDisconnect = (platformId) => {
   setPlatforms(prev => prev.map(platform => 
     platform.id === platformId 
       ? { 
           ...platform, 
           connected: false, 
           connectedDate: null,
           lastSync: null,
           reviewCount: 0
         }
       : platform
   ));
 };

 const handleSyncAll = () => {
   setSyncing(true);
   setTimeout(() => {
     setPlatforms(prev => prev.map(platform => 
       platform.connected 
         ? { ...platform, lastSync: '방금 전' }
         : platform
     ));
     setSyncing(false);
   }, 2000);
 };

 const connectedPlatforms = platforms.filter(p => p.connected);
 const totalReviews = connectedPlatforms.reduce((sum, p) => sum + p.reviewCount, 0);

 return (
   <Box className="mobile-container">
     <Header title="외부 플랫폼 연동" />
     
     <Box className="content-area">
       {/* 연동 현황 */}
       <Alert severity="info" sx={{ mb: 2 }}>
         🔗 연동 현황: {connectedPlatforms.length}개 플랫폼 연동 완료
       </Alert>

       <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
         📱 플랫폼 연동 관리
       </Typography>

       {/* 플랫폼 목록 */}
       {platforms.map((platform) => (
         <Card key={platform.id} sx={{ mb: 2 }}>
           <CardContent>
             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
               <Box
                 sx={{
                   width: 40,
                   height: 40,
                   borderRadius: 1,
                   bgcolor: platform.iconColor,
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   mr: 2
                 }}
               >
                 <Typography variant="h6" sx={{ color: platform.id === 'kakao' ? '#333' : 'white' }}>
                   {platform.icon}
                 </Typography>
               </Box>
               <Box sx={{ flex: 1 }}>
                 <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                   {platform.name}
                 </Typography>
                 {platform.connected && (
                   <Typography variant="caption" color="text.secondary">
                     연동일: {platform.connectedDate}
                   </Typography>
                 )}
               </Box>
               <Chip
                 label={platform.connected ? '연동됨' : '미연동'}
                 color={platform.connected ? 'success' : 'default'}
                 size="small"
               />
             </Box>

             {platform.connected ? (
               <>
                 <Typography variant="body2" color="success.main" sx={{ mb: 1 }}>
                   ✅ 연동 완료 • 최근 수집: {platform.lastSync}
                 </Typography>
                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                   수집된 리뷰: {platform.reviewCount}개
                 </Typography>
                 <Button
                   variant="outlined"
                   color="error"
                   startIcon={<LinkOff />}
                   onClick={() => handleDisconnect(platform.id)}
                   size="small"
                 >
                   해제
                 </Button>
               </>
             ) : (
               <>
                 <Typography variant="body2" color="warning.main" sx={{ mb: 2 }}>
                   ⚠️ 연동하여 더 많은 리뷰를 수집하세요
                 </Typography>
                 <Button
                   variant="contained"
                   startIcon={<Link />}
                   onClick={() => handleConnect(platform.id)}
                   size="small"
                 >
                   연동
                 </Button>
               </>
             )}
           </CardContent>
         </Card>
       ))}

       {/* 수집 통계 */}
       {connectedPlatforms.length > 0 && (
         <Card sx={{ mb: 2 }}>
           <CardContent>
             <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
               📊 수집 통계
             </Typography>
             {connectedPlatforms.map((platform) => (
               <Typography key={platform.id} variant="body2" sx={{ mb: 0.5 }}>
                 • {platform.name}: {platform.reviewCount}개 리뷰
               </Typography>
             ))}
             <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
               • 총 수집: {totalReviews}개 리뷰
             </Typography>
             <Typography variant="body2" color="text.secondary">
               • 마지막 수집: 1시간 전
             </Typography>
           </CardContent>
         </Card>
       )}

       {/* 수동 동기화 */}
       {connectedPlatforms.length > 0 && (
         <Button
           fullWidth
           variant="contained"
           startIcon={<Sync />}
           onClick={handleSyncAll}
           disabled={syncing}
           sx={{ mb: 2 }}
         >
           {syncing ? '동기화 중...' : '🔄 지금 동기화하기'}
         </Button>
       )}
     </Box>

     <OwnerNavigation />
   </Box>
 );
};

export default ExternalIntegration;