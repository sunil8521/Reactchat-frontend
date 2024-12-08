import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { styled } from '@mui/system';
import { shouldForwardProp } from '@mui/system';

const ChatContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
});

const MessageWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'ifUser',
})(({ theme, ifUser }) => ({
  display: 'flex',
  justifyContent: ifUser ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(2),
}));

const MessageBubbleSkeleton = styled(Skeleton)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: '10px',
  maxWidth: '100%',
}));

const ChatMessageSkeleton = ({ ifUser }) => (
  <MessageWrapper ifUser={ifUser}>
    {!ifUser && <Skeleton variant="circular" width={40} height={40} />}
    <Box ml={ifUser ? 0 : 1} mr={ifUser ? 1 : 0}>
      <MessageBubbleSkeleton variant="rectangular" width={200} height={40} />
      <Skeleton variant="text" width={50} />
    </Box>
    {ifUser && <Skeleton variant="circular" width={40} height={40} />}
  </MessageWrapper>
);

const MessageSkeleton = () => {
  return (
    <ChatContainer>
      {/* Display skeletons while loading */}
      {Array.from(new Array(10)).map((_, index) => (
        <ChatMessageSkeleton key={index} ifUser={index % 2 === 0} />
      ))}
    </ChatContainer>
  );
};

export default MessageSkeleton;
