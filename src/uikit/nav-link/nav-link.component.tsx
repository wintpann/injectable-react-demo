import React, { FC, memo } from 'react';
import { NavLinkProps, NavLink as RouterNavLink } from 'react-router-dom';
import { styled } from '@mui/material';

const Styled = {
  Wrapper: styled(RouterNavLink)`
    color: inherit;
    font-size: inherit;
    text-decoration: none;
  `,
};

export const NavLink: FC<NavLinkProps> = memo((props) => <Styled.Wrapper {...props} />);
