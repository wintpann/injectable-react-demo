import React, { FC } from 'react';
import { styled } from '@mui/material';
import { injectable } from '@injectable';
import { injectUserViewModel } from '@modules/user/view-models/user.view-model';
import { User } from '@modules/user/model/user.model';

export type AuthProps = { user: User };

export type AuthContainerProps = {
  Component: FC<AuthProps>;
};

const Styled = {
  Wrapper: styled('div')<{ disabled: boolean }>`
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
    filter: ${({ disabled }) => (disabled ? 'blur(3px)' : 'none')};
    border-radius: 10px;
    transition: filter 0.3s;
    height: 100%;
  `,
};

export const AuthContainer = injectable.component(
  injectUserViewModel(),
  (useUserViewModel) =>
    ({ Component }: AuthContainerProps) => {
      const { remoteUser } = useUserViewModel();

      return (
        <>
          {remoteUser.data ? (
            <Styled.Wrapper disabled={remoteUser.loading}>
              <Component user={remoteUser.data} />
            </Styled.Wrapper>
          ) : null}
        </>
      );
    },
);
