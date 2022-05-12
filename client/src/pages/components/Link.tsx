import { Link as MuiLink, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

type LinkProps = {
  to: string;
  underline?: boolean;
  sx: SxProps<Theme>;
};

const Link: React.FC<Omit<LinkProps, 'sx'>> = ({ to, underline = false, children }) => (
  <MuiLink
    component={RouterLink}
    to={to}
    style={{ textDecorationLine: underline ? 'underline' : 'none' }}
  >
    {children}
  </MuiLink>
);

const ButtonLink: React.FC<LinkProps> = ({
  to, underline = false, children, sx,
}) => (
  <MuiLink
    component={RouterLink}
    variant="button"
    href="#"
    color="text.primary"
    sx={sx}
    to={to}
    style={{ textDecorationLine: underline ? 'underline' : 'none' }}
  >
    {children}
  </MuiLink>
);

export { Link, ButtonLink };
