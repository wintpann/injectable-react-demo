import React, { FC, memo } from 'react';
import { styled } from '@mui/material';

const Styled = {
  Wrapper: styled('a')`
    font-size: 25px;
    font-weight: bold;
    color: var(--accent-text-color);
    text-decoration: none;
    text-shadow: 0 0 10px black;
    cursor: pointer;
    transition: transform 0.5s;

    &:hover {
      transform: scale(1.2);
    }

    display: flex;
    align-items: center;
    flex-direction: column;
  `,
  Image: styled('img')`
    border-radius: 50%;
    box-shadow: 0 0 10px var(--background-color);
  `,
  Text: styled('span')`
    font-size: 13px;
    color: #939393;
  `,
};

export const Logo: FC = memo(() => (
  <Styled.Wrapper href="https://www.npmjs.com/package/injectable-react" target="_blank">
    <Styled.Image src="./npm.png" width="80" height="80" alt="Logo" />
    <Styled.Text>check it out on npm</Styled.Text>
  </Styled.Wrapper>
));
