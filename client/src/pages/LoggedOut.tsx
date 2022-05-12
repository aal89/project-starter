import { CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../client';

export const LoggedOut: React.FC = () => {
  const navigate = useNavigate();

  const clearStorage = () => {
    localStorage.clear();
    client.clearStore();

    navigate('/');
  };

  useEffect(() => {
    clearStorage();
  });

  return (
    <>
      <CircularProgress />
      <Typography>Logging out&hellip;</Typography>
    </>
  );
};
