import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContainer } from '@shared/containers/auth.container';
import { CardsListPage } from '@pages/cards-list/cards-list.page';
import { CardDetailsPage } from '@pages/card-details/card-details.page';
import { TransactionDetailsPage } from '@pages/transaction-details/transaction-details.page';
import { TransactionsListPage } from '@pages/transactions-list/transaction-list.page';
import { injectable } from '@injectable';
import { ROUTES } from '@shared/routes';
import { Ghost } from '@uikit/ghost/ghost.component';

export const PageRoute = injectable.component(
  AuthContainer,
  CardsListPage,
  TransactionsListPage,
  TransactionDetailsPage,
  CardDetailsPage,
  (AuthContainer, CardsListPage, TransactionsListPage, TransactionDetailsPage, CardDetailsPage) =>
    () =>
      (
        <Routes>
          <Route path={ROUTES.HOME} element={<Ghost />} />
          <Route path={ROUTES.CARDS} element={<AuthContainer Component={CardsListPage} />} />
          <Route
            path={ROUTES.TRANSACTIONS}
            element={<AuthContainer Component={TransactionsListPage} />}
          />
          <Route
            path={ROUTES.TRANSACTION}
            element={<AuthContainer Component={TransactionDetailsPage} />}
          />
          <Route path={ROUTES.CARD} element={<AuthContainer Component={CardDetailsPage} />} />
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      ),
);
