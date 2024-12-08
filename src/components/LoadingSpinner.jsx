import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = ({thick=3.6}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh' }}>
      <CircularProgress thickness={thick} />
    </Box>
  );
};

export default LoadingSpinner;
