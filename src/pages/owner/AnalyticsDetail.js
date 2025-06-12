import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  DatePicker,
  Chip,
  Alert,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import { formatNumber } from '../../utils/helpers';
import { OwnerNavigation } from '../../components/common/Navigation';

const AnalyticsDetail = () => {
  const { storeId } = useParams();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [reviewAnalysis, setReviewAnalysis] = useState(null);
  const [selectedFeedbacks, setSelectedFeedbacks] = useState([]);

  const mockAiAnalysis = {
    period: '2024.05.01 - 2024.05.31',
    storeName: '분식천국',
    category: '분식',
    totalReviews: 47,
    sentiment: {
      positive: 68.1,
      neutral: 19.1,
      negative: 12.8
    },
    improvements: [
      {
        id: 1,
        category: '서비스',
        score: 4.2,
        feedback: '친절한 서비스로 고객 만족도가 높습니다. 계속 유지해주세요.',
        actionPlan: {
          short: '직원 친절 교육 지속',
          medium: '서비스 매뉴얼 정비',
          long: '고객 만족도 정기 조사'
        }
      },
      {
        id: 2,
        category: '음식 품질',
        score: 3.8,
        feedback: '맛에 대한 만족도는 보통 수준입니다. 조리법 개선을 고려해보세요.',
        actionPlan: {
          short: '레시피 점검 및 개선',
          medium: '요리사 추가 교육',
          long: '메뉴 리뉴얼 검토'
        }
      },
      {
        id: 3,
        category: '매장 환경',
        score: 3.2,
        feedback: '청결도와 인테리어에 대한 개선이 필요합니다.',
        actionPlan: {
          short: '청소 체크리스트 강화',
          medium: '인테리어 부분 개선',
          long: '매장 전체 리모델링'
        }
      }
    ]
  };

  const mockReviewAnalysis = {
    positive: [
      { category: '빠른 서비스', percentage: 23.4 },
      { category: '맛', percentage: 18.1 },
      { category: '가성비', percentage: 15.3 },
      { category: '친절함', percentage: 12.8 },
      { category: '혼밥하기 좋음', percentage: 9.1 }
    ],
    negative: [
      { category: '대기시간', percentage: 12.3 },
      { category: '매장 청결', percentage: 8.5 },
      { category: '인테리어', percentage: 5.8 },
      { category: '음식 온도', percentage: 3.3 },
      { category: '서비스', percentage: 2.1 }
    ]
  };

  useEffect(() => {
    setAiAnalysis(mockAiAnalysis);
    setReviewAnalysis(mockReviewAnalysis);
  }, [storeId]);

  const handleFeedbackSelect = (feedbackId) => {
    setSelectedFeedbacks(prev => 
      prev.includes(feedbackId)
        ? prev.filter(id => id !== feedbackId)
        : [...prev, feedbackId]
    );
  };

  const handleSaveActionPlan = () => {
    if (selectedFeedbacks.length === 0) {
      alert('실행 계획을 저장할 피드백을 선택해주세요.');
      return;
    }
    console.log('저장된 피드백:', selectedFeedbacks);
    alert('실행 계획이 저장되었습니다!');
  };

  const COLORS = ['#27ae60', '#f39c12', '#e74c3c'];

  if (!aiAnalysis) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="mobile-container">
      <Header title="AI 피드백 상세" />
      
      <Box className="content-area">
        {/* 분석 기본 정보 */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              📊 분석 정보
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>분석 기간:</strong> {aiAnalysis.period}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>업체명:</strong> {aiAnalysis.storeName}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>업종:</strong> {aiAnalysis.category}
            </Typography>
            <Typography variant="body2">
              <strong>분석 데이터:</strong> {formatNumber(aiAnalysis.totalReviews)}개 리뷰
            </Typography>
          </CardContent>
        </Card>

        {/* 감정 분석 결과 */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              😊 감정 분석 결과
            </Typography>
            <Box sx={{ height: 200, mb: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: '긍정', value: aiAnalysis.sentiment.positive },
                      { name: '중립', value: aiAnalysis.sentiment.neutral },
                      { name: '부정', value: aiAnalysis.sentiment.negative }
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {[0, 1, 2].map((index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip label={`긍정 ${aiAnalysis.sentiment.positive}%`} size="small" sx={{ bgcolor: '#27ae60', color: 'white' }} />
              <Chip label={`중립 ${aiAnalysis.sentiment.neutral}%`} size="small" sx={{ bgcolor: '#f39c12', color: 'white' }} />
              <Chip label={`부정 ${aiAnalysis.sentiment.negative}%`} size="small" sx={{ bgcolor: '#e74c3c', color: 'white' }} />
            </Box>
          </CardContent>
        </Card>

        {/* 개선 영역 분석 */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          🎯 개선 영역 분석
        </Typography>

        {aiAnalysis.improvements.map((improvement) => (
          <Card key={improvement.id} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {improvement.category} (점수: {improvement.score}/5)
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedFeedbacks.includes(improvement.id)}
                      onChange={() => handleFeedbackSelect(improvement.id)}
                    />
                  }
                  label="선택"
                />
              </Box>

              <Typography variant="body2" sx={{ mb: 2 }}>
                {improvement.feedback}
              </Typography>

              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                📋 실행 계획
              </Typography>
              
              <Box sx={{ pl: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>단기 (1주-1개월):</strong> {improvement.actionPlan.short}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>중기 (1-3개월):</strong> {improvement.actionPlan.medium}
                </Typography>
                <Typography variant="body2">
                  <strong>장기 (3개월+):</strong> {improvement.actionPlan.long}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}

        {/* 리뷰 키워드 분석 */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              📝 리뷰 키워드 분석
            </Typography>
            
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#27ae60' }}>
              😊 좋았던 점 TOP5
            </Typography>
            {reviewAnalysis.positive.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">{index + 1}. {item.category}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {item.percentage}%
                </Typography>
              </Box>
            ))}

            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2, mb: 1, color: '#e74c3c' }}>
              😔 아쉬웠던 점 TOP5
            </Typography>
            {reviewAnalysis.negative.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">{index + 1}. {item.category}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {item.percentage}%
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* 실행 계획 저장 */}
        {selectedFeedbacks.length > 0 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {selectedFeedbacks.length}개의 피드백과 실행 계획이 선택되었습니다.
          </Alert>
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={handleSaveActionPlan}
          disabled={selectedFeedbacks.length === 0}
          size="large"
          sx={{ mb: 2 }}
        >
          ✅ 선택한 실행 계획 저장
        </Button>
      </Box>
    <OwnerNavigation /> </Box>
  );
};

export default AnalyticsDetail;
