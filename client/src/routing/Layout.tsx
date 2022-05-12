import {
  Box, CssBaseline, Grid, ThemeProvider,
} from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../pages/components/Footer';
import { Navigation } from '../pages/components/Navigation';
import theme from '../theme';

export const Layout: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}
  >
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <Grid item md={12} padding={3}>
        <Outlet />
      </Grid>
      <Footer />
    </ThemeProvider>
  </Box>
);
