import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import { NextLinkComposed } from './Link';

const NavLinkRoot = styled(NextLinkComposed)(({ theme, size }) => ({
  textDecoration: 'none',
  textTransform: 'uppercase',
  padding: 0,
  borderRadius: 0,
  fontWeight: theme.typography.fontWeightMedium,
  fontFamily: theme.typography.h1.fontFamily,
  padding: theme.spacing(2, 4),
  fontSize: theme.typography.pxToRem(14),
  boxShadow: 'none',
  '&:active, &:focus': {
    boxShadow: 'none',
  },
  ...(size === 'small' && {
    padding: theme.spacing(1, 3),
    fontSize: theme.typography.pxToRem(13),
  }),
  ...(size === 'large' && {
    padding: theme.spacing(2, 5),
    fontSize: theme.typography.pxToRem(16),
  }),
}));

// See https://mui.com/guides/typescript/#usage-of-component-prop for why the types uses `C`.
function NavLink(props) {
  return <NavLinkRoot {...props} />;
}

export default NavLink;
