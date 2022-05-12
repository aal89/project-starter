import { Typography, Box, Container } from '@mui/material';
import React from 'react';
import { Brand } from './Brand';

export const Footer: React.FC = () => (
  <Box
    sx={{
      py: 3,
      px: 2,
      mt: 'auto',
    }}
  >
    <Container maxWidth="sm">
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Brand />
        {' '}
        {new Date().getFullYear()}
        .
      </Typography>
    </Container>
  </Box>
);
