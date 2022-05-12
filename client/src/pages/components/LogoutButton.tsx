import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import React from 'react';
import { LOGGEDOUT_REDIRECT } from '../../constants';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      href="#"
      variant="outlined"
      sx={{ my: 1, mx: 1.5 }}
      onClick={() => logout({ returnTo: LOGGEDOUT_REDIRECT })}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
