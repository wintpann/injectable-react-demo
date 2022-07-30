import React from 'react';
import { injectable } from '@injectable';
import { injectRouterService } from '@shared/services/router/router.service';
import { Breadcrumbs } from '@uikit/breadcrumbs/breadcrumbs.component';

export const BreadcrumbsContainer = injectable.component(
  injectRouterService(),
  (useRouterService) => () => {
    const { breadcrumbs } = useRouterService();

    return <Breadcrumbs items={breadcrumbs} />;
  },
);
