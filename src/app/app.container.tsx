import React from 'react';
import { Baseline } from '@app/baseline';
import { injectable } from '@injectable';
import { watch } from 'injectable-react';
import { DesktopLayout } from '@uikit/layout/desktop/deskto-layout.component';
import { MenuContainer } from '@shared/containers/menu.container';
import { UserContainer } from '@modules/user/containers/user.container';
import { BreadcrumbsContainer } from '@shared/containers/breadcrumbs.container';
import { PageRoute } from '@app/page-route';
import { Logo } from '@uikit/logo/logo.component';
import { resolved } from '@app/resolved';

const Bootstrap = injectable.component(
  MenuContainer,
  UserContainer,
  BreadcrumbsContainer,
  PageRoute,
  (MenuContainer, UserContainer, BreadcrumbsContainer, PageRoute) => () =>
    (
      <DesktopLayout
        Menu={<MenuContainer />}
        Logo={<Logo />}
        Breadcrumbs={<BreadcrumbsContainer />}
        User={<UserContainer />}
        Main={<PageRoute />}
      />
    ),
);

const BootstrapContainer = Bootstrap(resolved);
watch(resolved);

export const App = () => (
  <Baseline>
    <BootstrapContainer />
  </Baseline>
);
