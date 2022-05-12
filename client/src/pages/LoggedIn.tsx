import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../client';

export const LoggedIn: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const setAccessToken = async () => {
    const token = await getAccessTokenSilently();
    localStorage.setItem('token', token);

    client.clearStore();

    navigate('/');
  };

  useEffect(() => {
    setAccessToken();
  });

  return (
    <>
      <CircularProgress />
      <Typography>Logging in&hellip;</Typography>
    </>
  );
};
