import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Button,
  IconButton,
  Chip,
  Fab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Edit, Add, PhotoCamera } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import { OwnerNavigation } from '../../components/common/Navigation';
import { formatNumber } from '../../utils/helpers';

const MenuManagement = () => {
  const { storeId } = useParams();
  const [menus, setMenus] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    status: 'AVAILABLE'
  });

  const mockMenus = [
    {
      id: 1,
      name: '떡볶이',
      description: '매콤달콤한 떡볶이',
      price: 8000,
      status: 'AVAILABLE',
      image: '/images/menu-sample.jpg'
    },
    {
      id: 2,
      name: '불고기정식',
      description: '불고기와 밑반찬',
      price: 12000,
      status: 'POPULAR',
      image: '/images/menu-sample.jpg'
    },
    {
      id: 3,
      name: '된장찌개',
      description: '구수한 된장찌개',
      price: 7000,
      status: 'SOLD_OUT',
      image: '/images/menu-sample.jpg'
    }
  ];

  useEffect(() => {
    setMenus(mockMenus);
  }, [storeId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE': return 'success';
      case 'POPULAR': return 'warning';
      case 'SOLD_OUT': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'AVAILABLE': return '판매중';
      case 'POPULAR': return '인기';
      case 'SOLD_OUT': return '품절';
      default: return '알 수 없음';
    }
  };

  const handleEdit = (menu) => {
    setEditingMenu(menu);
    setFormData({
      name: menu.name,
      description: menu.description,
      price: menu.price.toString(),
      status: menu.status
    });
    setOpenModal(true);
  };

  const handleAdd = () => {
    setEditingMenu(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      status: 'AVAILABLE'
    });
    setOpenModal(true);
  };

  const handleSave = () => {
    if (editingMenu) {
      // 수정
      setMenus(prev => prev.map(menu => 
        menu.id === editingMenu.id 
          ? { ...menu, ...formData, price: parseInt(formData.price) }
          : menu
      ));
    } else {
      // 추가
      const newMenu = {
        id: Date.now(),
        ...formData,
        price: parseInt(formData.price),
        image: '/images/menu-sample.jpg'
      };
      setMenus(prev => [...prev, newMenu]);
    }
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box className="mobile-container">
      <Header title="메뉴 관리" />
      
      <Box className="content-area">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            등록된 메뉴 ({menus.length}개)
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAdd}
            size="small"
          >
            메뉴 추가
          </Button>
        </Box>

        {menus.map((menu) => (
          <Card key={menu.id} className="menu-item" sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', p: 2 }}>
              <Box
                component="img"
                sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1, mr: 2 }}
                src={menu.image}
                alt={menu.name}
              />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {menu.name}
                  </Typography>
                  <IconButton size="small" onClick={() => handleEdit(menu)}>
                    <Edit fontSize="small" />
                  </IconButton>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {menu.description}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" className="price-format">
                    {formatNumber(menu.price)}원
                  </Typography>
                  <Chip 
                    label={getStatusText(menu.status)} 
                    color={getStatusColor(menu.status)}
                    size="small"
                  />
                </Box>
              </Box>
            </Box>
          </Card>
        ))}

        {/* 변경사항 저장 버튼 */}
        <Button
          fullWidth
          variant="contained"
          color="success"
          size="large"
          sx={{ mt: 2 }}
        >
          ✅ 변경사항 저장
        </Button>
      </Box>

      {/* 메뉴 추가/수정 다이얼로그 */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingMenu ? '메뉴 수정' : '새 메뉴 추가'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="메뉴명"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="설명"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={2}
            />
            <TextField
              fullWidth
              label="가격"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              margin="normal"
            />
            
            {/* 이미지 업로드 */}
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>메뉴 사진</Typography>
              <Button
                variant="outlined"
                startIcon={<PhotoCamera />}
                fullWidth
              >
                사진 업로드
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>
            취소
          </Button>
          <Button variant="contained" onClick={handleSave}>
            저장
          </Button>
        </DialogActions>
      </Dialog>

      <OwnerNavigation />
    </Box>
  );
};

export default MenuManagement;