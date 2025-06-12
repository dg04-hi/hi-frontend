import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';

const Modal = ({ 
  open, 
  onClose, 
  title, 
  children, 
  actions,
  maxWidth = 'sm',
  fullWidth = true 
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      {title && (
        <DialogTitle>
          {title}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
      )}
      
      <DialogContent>
        {children}
      </DialogContent>
      
      {actions && (
        <DialogActions>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
