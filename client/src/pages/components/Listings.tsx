import { CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useGetListingsQuery } from '../../graphql/generated/graphql';

export const Listings: React.FC = () => {
  const { loading, data } = useGetListingsQuery();

  return (
    <>
      {loading && <CircularProgress />}
      {data && <Typography>{JSON.stringify(data)}</Typography>}
    </>
  );
};

export default Listings;
