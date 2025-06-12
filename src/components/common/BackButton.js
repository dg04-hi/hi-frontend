import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <IconButton
      className="back-button"
      onClick={handleClick}
      size="small"
    >
      <ArrowBack />
    </IconButton>
  );
};

export default BackButton;
