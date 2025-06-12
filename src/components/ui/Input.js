import React from 'react';
import { TextField } from '@mui/material';

const Input = ({ label, error, helperText, ...props }) => {
  return (
    <TextField
      label={label}
      error={!!error}
      helperText={error || helperText}
      variant="outlined"
      fullWidth
      {...props}
    />
  );
};

export default Input;
