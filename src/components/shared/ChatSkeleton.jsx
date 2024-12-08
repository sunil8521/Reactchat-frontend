import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const ChatSkeleton = () => {
  return (
    <Stack 
      spacing={1} 
      direction="row" 
      sx={{ padding: 1, alignItems: 'center', height: '5rem', width: '100%' }}
    >
      <Skeleton variant="circular" width={40} height={40} />
      <Box sx={{ flex: 1 }} spacing={0.5}  >
        <Box sx={{ display: 'flex', justifyContent: 'space-between',   }}>
          <Skeleton variant="text" width="100%" height={24} />
        </Box>
        <Skeleton variant="text" width="25%" height={16} />
        <Skeleton variant="text" width="80%" height={20} />
      </Box>
    </Stack>
  );
};


const ChatSkeletonList = ({ count = 8 }) => {
    return (
      <Box sx={{ width: '100%' }} paddingY={2}>
        {Array.from(new Array(count)).map((_, index) => (
          <ChatSkeleton key={index} />
        ))}
      </Box>
    );
  };

export default ChatSkeletonList;
