import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs';
import { useNavigate, useMatch, useSearchParams } from 'react-router-dom';
import last from 'lodash/last';
import { ROUTES } from '@shared/routes';
import { injectable } from '@injectable';
import { RouterService } from '@shared/services/router/router.ports';
import { useAction } from 'injectable-react';
import { CardFilter } from '@modules/cards/model/cards.ports';
import { getCardsRoute } from '@modules/cards/utils/card.utils';
import { TransactionFilter } from '@modules/transactions/model/transactions.ports';
import { getTransactionsRoute } from '@modules/transactions/utils/transaction.utils';

const pathToTitleMap: Record<string, string> = {
  [ROUTES.HOME]: 'Home',
  [ROUTES.TRANSACTIONS]: 'Transactions',
  [ROUTES.CARDS]: 'Cards',
};

const mapPathToTitle = (path: string) => pathToTitleMap[path] ?? last(path.split('/'));

export const createRouterService = injectable.hook((): RouterService => {
  const crumbs = useReactRouterBreadcrumbs();

  const transactionDetailsMatch = useMatch(ROUTES.TRANSACTION);
  const cardDetailsMatch = useMatch(ROUTES.CARD);
  const homeMatch = useMatch(ROUTES.HOME);

  const [searchParams] = useSearchParams();

  const breadcrumbs: RouterService['breadcrumbs'] = crumbs.map((item) => ({
    path: item.match.pathname,
    title: mapPathToTitle(item.match.pathname),
  }));

  const navigate = useNavigate();

  const goHome = useAction((replace = true) => {
    navigate(ROUTES.HOME, { replace });
  });

  const goCards = useAction((filter: CardFilter, replace: boolean) => {
    navigate(getCardsRoute(filter), { replace });
  });

  const goTransactions = useAction((filter: TransactionFilter, replace: boolean) => {
    navigate(getTransactionsRoute(filter), { replace });
  });

  return {
    breadcrumbs,
    goHome,
    goTransactions,
    goCards,
    transactionDetailsMatch,
    cardDetailsMatch,
    searchParams,
    homeMatch,
  };
});

export const injectRouterService = () => injectable.inject.hook<RouterService>()('routerService');
