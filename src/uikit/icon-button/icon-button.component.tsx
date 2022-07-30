import React, { FC, memo, MouseEventHandler, PropsWithChildren, useState } from 'react';
import { CircularProgress, styled } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useAction } from 'injectable-react';

const Styled = {
  Icon: styled('div')<{ loading?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 50%;
    background-color: var(--widget-block-color);
    cursor: pointer;
    transition: background 0.3s;

    svg {
      transition: color 0.3s;
    }

    &:hover {
      background-color: var(--text-color);

      svg {
        color: var(--widget-block-color);
      }
    }

    ${({ loading }) => loading && 'pointer-events: none; opacity: 0.5;'}
  `,
  Wrapper: styled('div')``,
};

type IconButtonProps = PropsWithChildren<{
  onClick?: MouseEventHandler;
  loading?: boolean;
  tip: string;
}>;

export const IconButton: FC<IconButtonProps> = memo(({ children, onClick, loading, tip }) => {
  const [open, setOpen] = useState(false);
  const onClose = useAction(() => setOpen(false));
  const onOpen = useAction(() => setOpen(true));

  return (
    <Styled.Wrapper onMouseLeave={onClose} className="IconButton">
      <Tooltip title={loading ? 'Loading...' : tip} open={open} onClose={onClose} onOpen={onOpen}>
        <Styled.Icon onClick={onClick} loading={loading}>
          {loading ? <CircularProgress size={24} /> : children}
        </Styled.Icon>
      </Tooltip>
    </Styled.Wrapper>
  );
});
