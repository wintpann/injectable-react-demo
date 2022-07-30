import React, { useMemo } from 'react';
import throttle from 'lodash/throttle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaidIcon from '@mui/icons-material/Paid';
import { injectable } from '@injectable';
import { injectNotificationService } from '@shared/services/notification/notificaton.service';
import { ROUTES } from '@shared/routes';
import { injectUserViewModel } from '@modules/user/view-models/user.view-model';
import { injectTransactionListViewModel } from '@modules/transactions/view-models/transaction-list.view-model';
import { injectCardListViewModel } from '@modules/cards/view-models/card-list.view-model';
import { MenuList } from '@uikit/menu-list/menu-list.component';

const MenuItems = {
  Cards: { icon: <CreditCardIcon />, path: ROUTES.CARDS, title: 'Cards' },
  Transactions: { icon: <PaidIcon />, path: ROUTES.TRANSACTIONS, title: 'Transactions' },
};

export const MenuContainer = injectable.component(
  injectNotificationService(),
  injectUserViewModel(),
  injectTransactionListViewModel(),
  injectCardListViewModel(),
  (notificationService, useUserViewModel, useTransactionListViewModel, useCardListViewModel) =>
    () => {
      const { warn } = notificationService;
      const { remoteUser } = useUserViewModel();

      const { cardsPaginated } = useCardListViewModel();
      const { transactionsPaginated } = useTransactionListViewModel();

      const onMenuClick = useMemo(
        () =>
          throttle(() => !remoteUser.loggedIn && warn('You are logged out'), 5000, {
            trailing: false,
          }),
        [warn, remoteUser.loggedIn],
      );

      const menuItems = useMemo(
        () => [
          {
            ...MenuItems.Cards,
            loading: cardsPaginated.loading,
          },
          {
            ...MenuItems.Transactions,
            loading: transactionsPaginated.loading,
          },
        ],
        [cardsPaginated.loading, transactionsPaginated.loading],
      );

      return <MenuList items={menuItems} disabled={!remoteUser.loggedIn} onClick={onMenuClick} />;
    },
);
