import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, onBack, showBackButton = true }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <Box className="page-header">
      {showBackButton && (
        <IconButton
          className="back-button"
          onClick={handleBack}
          size="small"
        >
          <ArrowBack />
        </IconButton>
      )}
      <Typography className="page-title">
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
