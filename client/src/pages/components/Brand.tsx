import HomeWorkIcon from '@mui/icons-material/HomeWork';
import React from 'react';
import { Link } from './Link';

type BrandProps = {
  link?: string;
};

export const Brand: React.FC<BrandProps> = ({ link = '/' }) => (
  <Link to={link}>
    <HomeWorkIcon />
    Huistat
  </Link>
);
