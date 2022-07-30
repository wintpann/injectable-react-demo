import React from 'react';
import { injectable } from '@injectable';
import { injectUserViewModel } from '@modules/user/view-models/user.view-model';
import { UserInfo } from '@modules/user/ui/user-info/user-info.component';

export const UserContainer = injectable.component(
  injectUserViewModel(),
  (useUserViewModel) => () => {
    const { remoteUser, logIn, logOut } = useUserViewModel();

    return (
      <UserInfo
        loggedIn={remoteUser.loggedIn}
        name={remoteUser.data?.name}
        onLogin={logIn}
        onLogout={logOut}
        loading={remoteUser.loading}
      />
    );
  },
);
