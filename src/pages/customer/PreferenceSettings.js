import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  Button,
  Alert
} from '@mui/material';
import Header from '../../components/common/Header';
import { memberService } from '../../services/member';

const PreferenceSettings = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const mockTags = {
    taste: ['매운맛', '단맛', '짠맛', '담백한맛'],
    cuisine: ['한식', '중식', '일식', '양식', '분식', '치킨', '피자', '카페'],
    atmosphere: ['깨끗한', '쾌적한', '혼밥', '회식', '가족', '데이트', '모임'],
    health: ['저염', '저당', '글루텐프리', '유기농'],
    allergy: ['유제품', '견과류', '갑각류', '계란']
  };

  useEffect(() => {
    const allTags = [
      ...mockTags.taste,
      ...mockTags.cuisine,
      ...mockTags.atmosphere,
      ...mockTags.health,
      ...mockTags.allergy
    ];
    setAvailableTags(allTags);
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setMessage('');
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await memberService.savePreferences({
        tags: selectedTags
      });
      setMessage('취향 정보가 저장되었습니다!');
    } catch (error) {
      setMessage('저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const renderTagSection = (title, icon, tags) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        {icon} {title}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            clickable
            color={selectedTags.includes(tag) ? 'primary' : 'default'}
            onClick={() => handleTagClick(tag)}
            size="small"
          />
        ))}
      </Box>
    </Box>
  );

  return (
    <Box className="mobile-container">
      <Header title="취향 설정" />
      
      <Box className="content-area">
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
          선호하는 태그를 선택하면 더 정확한 맛집을 추천해드려요!
        </Typography>

        {renderTagSection('맛', '🌶️', mockTags.taste)}
        {renderTagSection('음식 종류', '🍽️', mockTags.cuisine)}
        {renderTagSection('분위기', '🏪', mockTags.atmosphere)}
        {renderTagSection('건강 정보', '💚', mockTags.health)}
        {renderTagSection('알레르기', '⚠️', mockTags.allergy)}

        {message && (
          <Alert 
            severity={message.includes('실패') ? 'error' : 'success'} 
            sx={{ mb: 2 }}
          >
            {message}
          </Alert>
        )}

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSave}
          disabled={loading || selectedTags.length === 0}
          sx={{ height: 48 }}
        >
          {loading ? '저장 중...' : '✅ 저장하고 추천받기'}
        </Button>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
          선택된 태그: {selectedTags.length}개
        </Typography>
      </Box>
    </Box>
  );
};

export default PreferenceSettings;