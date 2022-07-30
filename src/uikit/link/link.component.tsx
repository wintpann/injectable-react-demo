import React, { FC, memo } from 'react';
import { LinkProps, Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material';

const Styled = {
  Wrapper: styled(RouterLink)`
    color: inherit;
    font-size: inherit;
    text-decoration: none;
  `,
};

export const Link: FC<LinkProps> = memo((props) => <Styled.Wrapper {...props} />);
