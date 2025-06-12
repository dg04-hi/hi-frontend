import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Chip,
  Button,
  Alert
} from '@mui/material';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';

const ActionPlan = () => {
  const { storeId } = useParams();
  const [actionPlans, setActionPlans] = useState([]);

  const mockActionPlans = [
    {
      id: 1,
      category: '서비스',
      feedback: '친절한 서비스로 고객 만족도가 높습니다. 계속 유지해주세요.',
      plans: [
        {
          id: 11,
          type: 'short',
          title: '직원 친절 교육 지속',
          description: '매주 직원 친절 서비스 교육 실시',
          completed: true
        },
        {
          id: 12,
          type: 'medium',
          title: '서비스 매뉴얼 정비',
          description: '고객 응대 표준 매뉴얼 작성 및 배포',
          completed: false
        },
        {
          id: 13,
          type: 'long',
          title: '고객 만족도 정기 조사',
          description: '분기별 고객 만족도 설문조사 실시',
          completed: false
        }
      ]
    },
    {
      id: 2,
      category: '음식 품질',
      feedback: '맛에 대한 만족도는 보통 수준입니다. 조리법 개선을 고려해보세요.',
      plans: [
        {
          id: 21,
          type: 'short',
          title: '레시피 점검 및 개선',
          description: '기존 레시피 재검토 및 개선사항 적용',
          completed: false
        },
        {
          id: 22,
          type: 'medium',
          title: '요리사 추가 교육',
          description: '전문 요리 교육 프로그램 참여',
          completed: false
        },
        {
          id: 23,
          type: 'long',
          title: '메뉴 리뉴얼 검토',
          description: '신메뉴 개발 및 기존 메뉴 개선',
          completed: false
        }
      ]
    },
    {
      id: 3,
      category: '매장 환경',
      feedback: '청결도와 인테리어에 대한 개선이 필요합니다.',
      plans: [
        {
          id: 31,
          type: 'short',
          title: '청소 체크리스트 강화',
          description: '시간대별 청소 체크리스트 작성 및 실행',
          completed: true
        },
        {
          id: 32,
          type: 'medium',
          title: '인테리어 부분 개선',
          description: '테이블, 의자 등 주요 가구 교체',
          completed: false
        },
        {
          id: 33,
          type: 'long',
          title: '매장 전체 리모델링',
          description: '매장 전체 인테리어 리모델링',
          completed: false
        }
      ]
    }
  ];

  useEffect(() => {
    setActionPlans(mockActionPlans);
  }, []);

  const getTypeLabel = (type) => {
    switch (type) {
      case 'short': return '단기';
      case 'medium': return '중기';
      case 'long': return '장기';
      default: return '';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'short': return 'success';
      case 'medium': return 'warning';
      case 'long': return 'info';
      default: return 'default';
    }
  };

  const handleToggleComplete = (categoryId, planId) => {
    setActionPlans(prev => prev.map(category => 
      category.id === categoryId 
        ? {
            ...category,
            plans: category.plans.map(plan => 
              plan.id === planId 
                ? { ...plan, completed: !plan.completed }
                : plan
            )
          }
        : category
    ));
  };

  const getTotalPlans = () => {
    return actionPlans.reduce((total, category) => total + category.plans.length, 0);
  };

  const getCompletedPlans = () => {
    return actionPlans.reduce((total, category) => 
      total + category.plans.filter(plan => plan.completed).length, 0
    );
  };

  const completionRate = getTotalPlans() > 0 ? (getCompletedPlans() / getTotalPlans() * 100).toFixed(1) : 0;

  return (
    <Box className="mobile-container">
      <Header title="실행 계획 상세" />
      
      <Box className="content-area">
        {/* 진행률 요약 */}
        <Alert severity="info" sx={{ mb: 2 }}>
          📊 전체 진행률: {completionRate}% ({getCompletedPlans()}/{getTotalPlans()}개 완료)
        </Alert>

        {actionPlans.length === 0 ? (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                저장된 실행 계획이 없습니다.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                AI 피드백에서 실행 계획을 저장해주세요.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          actionPlans.map((category) => (
            <Card key={category.id} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {category.category}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {category.feedback}
                </Typography>

                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                  📋 실행 계획
                </Typography>

                {category.plans
                  .sort((a, b) => {
                    const order = { short: 1, medium: 2, long: 3 };
                    return order[a.type] - order[b.type];
                  })
                  .map((plan) => (
                    <Box key={plan.id} sx={{ mb: 2, p: 2, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={plan.completed}
                              onChange={() => handleToggleComplete(category.id, plan.id)}
                              icon={<RadioButtonUnchecked />}
                              checkedIcon={<CheckCircle />}
                            />
                          }
                          label=""
                          sx={{ mr: 1, mt: -1 }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Chip 
                              label={getTypeLabel(plan.type)} 
                              color={getTypeColor(plan.type)}
                              size="small"
                            />
                            <Typography 
                              variant="subtitle2" 
                              sx={{ 
                                fontWeight: 'bold',
                                textDecoration: plan.completed ? 'line-through' : 'none',
                                color: plan.completed ? 'text.secondary' : 'text.primary'
                              }}
                            >
                              {plan.title}
                            </Typography>
                          </Box>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: plan.completed ? 'text.secondary' : 'text.primary',
                              textDecoration: plan.completed ? 'line-through' : 'none'
                            }}
                          >
                            {plan.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))
                }

                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    완료: {category.plans.filter(p => p.completed).length}/{category.plans.length}개
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))
        )}

        {/* 저장 안내 */}
        {actionPlans.length > 0 && (
          <Alert severity="success" sx={{ mt: 2 }}>
            💡 체크박스를 클릭하면 실행 완료 상태가 자동으로 저장됩니다.
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default ActionPlan;