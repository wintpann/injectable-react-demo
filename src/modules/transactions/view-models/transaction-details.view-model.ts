import { useAction } from 'injectable-react';
import { injectable } from '@injectable';
import { TransactionDetailsViewModel } from '@modules/transactions/model/transactions.ports';
import { injectTransactionApiService } from '@shared/services/transaction-api/transaction-api.service';
import { injectNotificationService } from '@shared/services/notification/notificaton.service';
import { injectCrossWindowService } from '@shared/services/cross-window-event/cross-window-event.service';
import { useImmer } from 'use-immer';
import { RemoteData } from '@shared/utils/remote.utils';
import { Transaction } from '@modules/transactions/model/transactions.model';
import { isSuccess, remoteData } from '@shared/services/api/api.utils';
import { useExhaustiveEffect } from '@hooks/use-exhaustive.hook';
import { CrossWindowEvent } from '@shared/services/cross-window-event/cross-window-event.ports';

export const createTransactionDetailsViewModel = injectable.hook(
  injectTransactionApiService(),
  injectNotificationService(),
  injectCrossWindowService(),
  (
    transactionApiService,
    notificationService,
    crossWindowEventService,
  ): TransactionDetailsViewModel => {
    const { apiRequestError } = notificationService;
    const { getTransactionRequest } = transactionApiService;
    const { on } = crossWindowEventService;

    const [selectedTransaction, setSelectedTransaction] = useImmer<RemoteData<Transaction>>(
      remoteData(),
    );

    const reset: TransactionDetailsViewModel['reset'] = useAction(() => {
      setSelectedTransaction(remoteData());
    });

    const loadTransaction: TransactionDetailsViewModel['loadTransaction'] = useAction(
      async (userId, transactionID) => {
        setSelectedTransaction((draft) => {
          draft.loading = true;
        });
        const transaction = await getTransactionRequest(userId, transactionID);
        if (isSuccess(transaction)) {
          setSelectedTransaction((draft) => {
            draft.loading = false;
            draft.data = transaction.data;
          });
        } else {
          apiRequestError();
          setSelectedTransaction((draft) => {
            draft.loading = false;
          });
        }
      },
    );

    useExhaustiveEffect(
      () =>
        on(CrossWindowEvent.LOGOUT, () => {
          setSelectedTransaction(remoteData({ loading: false }));
        }),
      [],
    );

    return {
      selectedTransaction,
      loadTransaction,
      reset,
    };
  },
);

export const injectTransactionDetailsViewModel = () =>
  injectable.inject.hook<TransactionDetailsViewModel>()('transactionDetailsViewModel');
