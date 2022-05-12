import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import React from 'react';
import { LOGGEDIN_REDIRECT } from '../../constants';

export const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      href="#"
      variant="outlined"
      sx={{ my: 1, mx: 1.5 }}
      onClick={() => loginWithRedirect({ redirectUri: LOGGEDIN_REDIRECT })}
    >
      Login
    </Button>
  );
};

export default LoginButton;
