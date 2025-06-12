import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { OwnerNavigation } from '../../components/common/Navigation';
import { formatNumber } from '../../utils/helpers';

const OwnerDashboard = () => {
  const [selectedStore, setSelectedStore] = useState('분식천국');
  const [orderStats, setOrderStats] = useState([]);
  const [genderAgeStats, setGenderAgeStats] = useState([]);
  const [timeStats, setTimeStats] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);

  const mockOrderStats = [
    { name: '떡볶이', value: 45 },
    { name: '김밥', value: 30 },
    { name: '순대', value: 15 },
    { name: '튀김', value: 10 }
  ];

  const mockGenderAgeStats = [
    { name: '남성 20대', value: 23, fill: '#3498db' },
    { name: '남성 30대', value: 45, fill: '#2980b9' },
    { name: '여성 20대', value: 35, fill: '#e74c3c' },
    { name: '여성 30대', value: 40, fill: '#c0392b' },
    { name: '기타', value: 12, fill: '#95a5a6' }
  ];

  const mockTimeStats = [
    { time: '11시', orders: 15 },
    { time: '12시', orders: 45 },
    { time: '13시', orders: 30 },
    { time: '18시', orders: 25 },
    { time: '19시', orders: 35 }
  ];

  const mockAiInsights = [
    {
      category: '서비스',
      positive: 33.9,
      negative: 15.2,
      insight: '친절한 서비스로 고객 만족도가 높습니다.'
    },
    {
      category: '맛',
      positive: 28.5,
      negative: 8.1,
      insight: '맛에 대한 만족도가 전반적으로 좋습니다.'
    },
    {
      category: '인테리어',
      positive: 12.3,
      negative: 30.0,
      insight: '인테리어 개선이 필요합니다.'
    }
  ];

  useEffect(() => {
    setOrderStats(mockOrderStats);
    setGenderAgeStats(mockGenderAgeStats);
    setTimeStats(mockTimeStats);
    setAiInsights(mockAiInsights);
  }, []);

  const COLORS = ['#f39c12', '#3498db', '#e74c3c', '#27ae60'];

  return (
    <Box className="mobile-container">
      {/* 헤더 */}
      <Box sx={{ p: 2, bgcolor: '#2c3e50', color: 'white' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          매장 분석 대시보드
        </Typography>
        <Typography variant="body2">
          {selectedStore} • 실시간 분석 데이터
        </Typography>
      </Box>

      <Box className="content-area">
        {/* 인기 메뉴 통계 */}
        <Card className="stat-card">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              📊 인기 메뉴 TOP5
            </Typography>
            <Box sx={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStats}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {orderStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>

        {/* 성별 연령대별 분석 */}
        <Card className="stat-card">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              👥 성별·연령대별 분석
            </Typography>
            <Box sx={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderAgeStats}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {genderAgeStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              주요 고객층: 남성 30대 (45%), 여성 30대 (40%)
            </Typography>
          </CardContent>
        </Card>

        {/* 시간대별 주문량 */}
        <Card className="stat-card">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              🕒 시간대별 주문량
            </Typography>
            <Box sx={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#f39c12" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>

        {/* AI 피드백 */}
        <Card className="stat-card">
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                🤖 AI 피드백
              </Typography>
              <Button 
                size="small" 
                variant="outlined"
                onClick={() => window.location.href = '/owner/analytics/1'}
              >
                더보기
              </Button>
            </Box>
            
            {aiInsights.slice(0, 2).map((insight, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {insight.category}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  긍정: {insight.positive}% | 부정: {insight.negative}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {insight.insight}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* 리뷰 분석 */}
        <Card className="stat-card">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              📝 리뷰 분석
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              최근 30일 • 총 {formatNumber(47)}개 리뷰
            </Typography>
            
            <Box sx={{ p: 2, bgcolor: '#e8f5e8', borderRadius: 1, mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#27ae60' }}>
                😊 좋은 점
              </Typography>
              <Typography variant="body2">
                빠른 서비스 (23%), 맛 (18%), 가성비 (15%)
              </Typography>
            </Box>
            
            <Box sx={{ p: 2, bgcolor: '#fdf2f2', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#e74c3c' }}>
                😔 아쉬운 점
              </Typography>
              <Typography variant="body2">
                대기시간 (12%), 매장 청결 (8%)
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* 실행 계획 */}
        <Card className="stat-card">
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                📋 실행 계획
              </Typography>
              <Button 
                size="small" 
                variant="outlined"
                onClick={() => window.location.href = '/owner/action-plan/1'}
>
더보기
</Button>
</Box>
        <Box sx={{ p: 2, border: '1px dashed #ddd', borderRadius: 1, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            AI 피드백을 저장하면 실행 계획이 표시됩니다
          </Typography>
        </Box>
      </CardContent>
    </Card>
  </Box>

  <OwnerNavigation />
</Box>
);
};
export default OwnerDashboard;