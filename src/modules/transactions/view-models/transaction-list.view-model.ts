import { useAction } from 'injectable-react';
import {
  TransactionFilter,
  TransactionListViewModel,
} from '@modules/transactions/model/transactions.ports';
import { injectable } from '@injectable';
import { injectTransactionApiService } from '@shared/services/transaction-api/transaction-api.service';
import { injectCrossWindowService } from '@shared/services/cross-window-event/cross-window-event.service';
import { injectNotificationService } from '@shared/services/notification/notificaton.service';
import { PaginatedRemoteData } from '@shared/utils/remote.utils';
import { Transaction } from '@modules/transactions/model/transactions.model';
import { usePaginatedRemoteDataWith } from '@shared/services/api/api.utils';
import { useExhaustiveEffect } from '@hooks/use-exhaustive.hook';
import { CrossWindowEvent } from '@shared/services/cross-window-event/cross-window-event.ports';

export const emptyTransactionFilter: TransactionFilter = {};

export const createTransactionListViewModel = injectable.hook(
  injectTransactionApiService(),
  injectNotificationService(),
  injectCrossWindowService(),
  (
    transactionApiService,
    notificationService,
    crossWindowEventService,
  ): TransactionListViewModel => {
    const { apiRequestError } = notificationService;
    const { getTransactionsRequest } = transactionApiService;
    const { on } = crossWindowEventService;

    const getTransactions = useAction(
      async (
        state: PaginatedRemoteData<Transaction, { filter: TransactionFilter; userId: string }>,
      ) =>
        await getTransactionsRequest(
          state.userId,
          { page: state.page, count: state.count },
          state.filter,
          false,
        ),
    );

    const {
      state: transactionsPaginated,
      load: loadTransactionList,
      setState: setTransactionsPaginated,
      reset: resetTransactionsPaginated,
      loadNext: loadNextTransactionList,
    } = usePaginatedRemoteDataWith<Transaction, { filter: TransactionFilter; userId: string }>({
      additional: { filter: emptyTransactionFilter, userId: '' },
      initial: { count: 10 },
      onFailure: apiRequestError,
      getData: getTransactions,
    });

    useExhaustiveEffect(
      () =>
        on(CrossWindowEvent.LOGOUT, () => {
          resetTransactionsPaginated();
        }),
      [],
    );

    const loadTransactions: TransactionListViewModel['loadTransactions'] = useAction(
      async (userId, filter) => {
        await loadTransactionList({ userId, filter });
      },
    );

    const loadNextTransactions: TransactionListViewModel['loadNextTransactions'] = useAction(
      async (userId) => {
        await loadNextTransactionList({ userId });
      },
    );

    const setFilter: TransactionListViewModel['setFilter'] = useAction((filter) => {
      setTransactionsPaginated((prev) => ({ filter: { ...prev.filter, ...filter } }));
    });

    return {
      transactionsPaginated,
      loadTransactions,
      loadNextTransactions,
      filter: transactionsPaginated.filter,
      setFilter,
    };
  },
);

export const injectTransactionListViewModel = () =>
  injectable.inject.hook<TransactionListViewModel>()('transactionListViewModel');
