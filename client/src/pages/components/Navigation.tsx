import { useAuth0 } from '@auth0/auth0-react';
import AddIcon from '@mui/icons-material/Add';
import {
  AppBar, Toolbar, Typography, CircularProgress,
} from '@mui/material';
import React from 'react';
import { Brand } from './Brand';
import { ButtonLink } from './Link';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { AdminComponent, GuardedComponent } from './authorization/RestrictedComponents';

export const Navigation: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();

  return (
    <AppBar position="static" color="default" elevation={3}>
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <Brand />
        </Typography>
        <AdminComponent>
          <ButtonLink to="/property/create" sx={{ my: 1, mx: 1.5 }}>
            <AddIcon />
            {' '}
            Create property
          </ButtonLink>
        </AdminComponent>
        {isLoading && <CircularProgress size={25} />}
        <GuardedComponent>
          <Typography>{user?.nickname}</Typography>
        </GuardedComponent>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </Toolbar>
    </AppBar>
  );
};
