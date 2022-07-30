import React, { FC, Fragment, memo, ReactNode } from 'react';
import Divider from '@mui/material/Divider';
import { CircularProgress, styled } from '@mui/material';
import { NavLink } from '@uikit/nav-link/nav-link.component';

const Styled = {
  List: styled('div')<{ disabled?: boolean }>`
    transition: opacity 0.3s;
    ${({ disabled }) => disabled && 'opacity: 0.5; pointer-events: none'}
  `,
  Wrapper: styled('div')``,
  ListItem: styled(NavLink)`
    background-color: var(--widget-block-color);

    &.active {
      background-color: var(--accent-background-color);
    }

    cursor: pointer;
    color: var(--text-color);
    text-decoration: none;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 5px;
    margin: 5px 0;
    transition: background 0.3s;

    &:hover {
      background-color: var(--accent-background-light-color);
    }
  `,
  ListItemIcon: styled('div')`
    display: flex;
    justify-content: center;
    margin: 10px;

    svg {
      color: var(--text-color);
    }
  `,
  ListItemText: styled('span')`
    font-weight: bold;
  `,
};

type MenuListItemProps = {
  icon: ReactNode;
  title: string;
  path: string;
  loading?: boolean;
};

const MenuListItem: FC<MenuListItemProps> = memo(({ icon, title, path, loading }) => (
  <Styled.ListItem to={path}>
    <Styled.ListItemIcon>{loading ? <CircularProgress size={24} /> : icon}</Styled.ListItemIcon>
    <Styled.ListItemText>{title}</Styled.ListItemText>
  </Styled.ListItem>
));

export type MenuListProps = {
  items: Array<{
    icon: ReactNode;
    title: string;
    path: string;
    loading?: boolean;
  }>;
  disabled?: boolean;
  onClick?: () => void;
};

export const MenuList: FC<MenuListProps> = memo(({ items, disabled, onClick }) => (
  <Styled.Wrapper onClick={onClick}>
    <Styled.List disabled={disabled}>
      {items.map(({ icon, title, path, loading }, index) => (
        <Fragment key={path}>
          <MenuListItem icon={icon} path={path} title={title} loading={loading} />
          {index === items.length - 1 ? null : <Divider />}
        </Fragment>
      ))}
    </Styled.List>
  </Styled.Wrapper>
));
