import React, { FC, memo } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { styled } from '@mui/material';
import { IconButton } from '@uikit/icon-button/icon-button.component';

const Styled = {
  Wrapper: styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  `,
  Icon: styled('div')`
    margin-left: 10px;
  `,
};

type UserInfoProps = {
  name?: string;
  loggedIn: boolean;
  loading?: boolean;
  onLogin: () => void;
  onLogout: () => void;
};

export const UserInfo: FC<UserInfoProps> = memo(
  ({ name, loggedIn, onLogin, onLogout, loading }) => {
    const hasName = Boolean(name);

    return (
      <Styled.Wrapper>
        {loggedIn && hasName ? name : 'Signed out'}
        <Styled.Icon>
          {loggedIn ? (
            <IconButton onClick={onLogout} loading={loading} tip="Logout">
              <LogoutIcon />
            </IconButton>
          ) : (
            <IconButton onClick={onLogin} loading={loading} tip="Login">
              <LoginIcon />
            </IconButton>
          )}
        </Styled.Icon>
      </Styled.Wrapper>
    );
  },
);
