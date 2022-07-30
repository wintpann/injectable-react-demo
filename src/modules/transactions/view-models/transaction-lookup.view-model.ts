import { useAction } from 'injectable-react';
import { injectable } from '@injectable';
import { injectTransactionApiService } from '@shared/services/transaction-api/transaction-api.service';
import { injectCrossWindowService } from '@shared/services/cross-window-event/cross-window-event.service';
import { injectNotificationService } from '@shared/services/notification/notificaton.service';
import { injectUserViewModel } from '@modules/user/view-models/user.view-model';
import {
  TransactionLookupViewModel,
  TransactionsLookup,
} from '@modules/transactions/model/transactions.ports';
import { useImmer } from 'use-immer';
import { isSuccess, remoteData } from '@shared/services/api/api.utils';
import { RemoteData } from '@shared/utils/remote.utils';
import { useExhaustiveEffect } from '@hooks/use-exhaustive.hook';
import { CrossWindowEvent } from '@shared/services/cross-window-event/cross-window-event.ports';

export const createTransactionLookupViewModel = injectable.hook(
  injectTransactionApiService(),
  injectNotificationService(),
  injectCrossWindowService(),
  injectUserViewModel(),
  (
    transactionApiService,
    notificationService,
    crossWindowEventService,
    useUserViewModel,
  ): TransactionLookupViewModel => {
    const { apiRequestError } = notificationService;
    const { getTransactionsLookupRequest } = transactionApiService;
    const { on } = crossWindowEventService;
    const { remoteUser } = useUserViewModel();

    const [remoteLookup, setRemoteLookup] = useImmer<RemoteData<TransactionsLookup>>(remoteData());

    const loadLookup = useAction(async (userId: string) => {
      const response = await getTransactionsLookupRequest(userId);
      if (isSuccess(response)) {
        setRemoteLookup({ data: response.data, loading: false });
      } else {
        apiRequestError();
      }
    });

    useExhaustiveEffect(
      () =>
        on(CrossWindowEvent.LOGOUT, () => {
          setRemoteLookup(remoteData({ loading: false }));
        }),
      [],
    );

    useExhaustiveEffect(() => {
      if (remoteUser.data?.id) {
        loadLookup(remoteUser.data.id);
      }
    }, [remoteUser.data?.id]);

    return {
      remoteLookup,
    };
  },
);

export const injectTransactionLookupViewModel = () =>
  injectable.inject.hook<TransactionLookupViewModel>()('transactionLookupViewModel');
