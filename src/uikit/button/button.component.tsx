import React, { FC, memo, PropsWithChildren } from 'react';
import cx from 'classnames';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material';

type ButtonProps = PropsWithChildren<{
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
}>;

const Styled = {
  Button: styled(LoadingButton)`
    padding: 5px;
    color: #f5f5f5;
    box-shadow: 0 0 5px var(--background-color);
    background-color: var(--accent-background-color);
    text-transform: initial;
    font-family: 'Quicksand', sans-serif;
    font-size: 16px;
    width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};

    .MuiLoadingButton-loadingIndicator .MuiCircularProgress-root {
      color: azure;
    }

    &:hover {
      background-color: var(--accent-background-light-color);
    }
  `,
};

export const Button: FC<ButtonProps> = memo(
  ({ className, loading, children, fullWidth = false, onClick }) => (
    <Styled.Button
      loading={loading}
      fullWidth={fullWidth}
      onClick={onClick}
      className={cx(className, 'Button')}
    >
      {children}
    </Styled.Button>
  ),
);
