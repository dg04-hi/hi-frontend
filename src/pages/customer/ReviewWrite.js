import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Card,
  CardContent,
  Alert,
  IconButton
} from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import { validateReviewContent } from '../../utils/validation';

const ReviewWrite = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rating: 5,
    content: '',
    images: []
  });
  const [receiptVerified, setReceiptVerified] = useState(false);
  const [error, setError] = useState('');

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      rating: newValue
    });
  };

  const handleContentChange = (e) => {
    setFormData({
      ...formData,
      content: e.target.value
    });
    setError('');
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setFormData({
      ...formData,
      images: [...formData.images, ...newImages]
    });
  };

  const handleImageRemove = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const handleReceiptUpload = () => {
    // Mock receipt verification
    setReceiptVerified(true);
  };

  const handleSubmit = () => {
    if (!receiptVerified) {
      setError('영수증 인증이 필요합니다.');
      return;
    }

    if (!validateReviewContent(formData.content)) {
      setError('리뷰는 10자 이상 100자 미만으로 작성해주세요.');
      return;
    }

    // Mock review submission
    console.log('Review submitted:', formData);
    navigate(`/customer/store/${storeId}`);
  };

  return (
    <Box className="mobile-container">
      <Header title="리뷰 작성" />
      
      <Box className="content-area">
        {/* 영수증 인증 */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              📄 영수증 인증
            </Typography>
            
            {!receiptVerified ? (
              <>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  리뷰 작성을 위해 영수증 인증이 필요합니다.
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleReceiptUpload}
                  sx={{ mb: 1 }}
                >
                  📷 영수증 촬영하기
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleReceiptUpload}
                >
                  🖼️ 갤러리에서 선택
                </Button>
              </>
            ) : (
              <Alert severity="success">
                ✅ 영수증 인증이 완료되었습니다!
              </Alert>
            )}
          </CardContent>
        </Card>

        {receiptVerified && (
          <>
            {/* 별점 */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  ⭐ 별점 평가
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                  <Rating
                    value={formData.rating}
                    onChange={handleRatingChange}
                    size="large"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {formData.rating}점
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* 리뷰 내용 */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  ✍️ 리뷰 내용
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="솔직한 리뷰를 작성해주세요 (10자 이상 100자 미만)"
                  value={formData.content}
                  onChange={handleContentChange}
                  helperText={`${formData.content.length}/100자`}
                />
              </CardContent>
            </Card>

            {/* 사진 첨부 */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  📷 사진 첨부 (선택)
                </Typography>
                
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                  multiple
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCamera />}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    사진 추가 (PNG, JPG, 15MB 이하)
                  </Button>
                </label>

                {formData.images.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.images.map((image, index) => (
                      <Box key={index} sx={{ position: 'relative' }}>
                        <Box
                          component="img"
                          sx={{ width: 80, height: 80, borderRadius: 1, objectFit: 'cover' }}
                          src={image.preview}
                          alt={`Preview ${index + 1}`}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            bgcolor: 'error.main',
                            color: 'white',
                            '&:hover': { bgcolor: 'error.dark' }
                          }}
                          onClick={() => handleImageRemove(index)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{ height: 48 }}
            >
              리뷰 등록하기
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ReviewWrite;
