import { useAction } from 'injectable-react';
import { injectable } from '@injectable';
import { injectCardApiService } from '@shared/services/card-api/card-api.service';
import { injectTransactionApiService } from '@shared/services/transaction-api/transaction-api.service';
import { injectNotificationService } from '@shared/services/notification/notificaton.service';
import { injectCrossWindowService } from '@shared/services/cross-window-event/cross-window-event.service';
import { CardDetailsViewModel } from '@modules/cards/model/cards.ports';
import { useImmer } from 'use-immer';
import { RemoteData } from '@shared/utils/remote.utils';
import { Card } from '@modules/cards/model/cards.model';
import { isSuccess, remoteData } from '@shared/services/api/api.utils';
import { CrossWindowEvent } from '@shared/services/cross-window-event/cross-window-event.ports';
import { useExhaustiveEffect } from '@hooks/use-exhaustive.hook';
import { Transaction } from '@modules/transactions/model/transactions.model';

export const createCardDetailsViewModel = injectable.hook(
  injectCardApiService(),
  injectTransactionApiService(),
  injectNotificationService(),
  injectCrossWindowService(),
  (
    cardApiService,
    transactionApiService,
    notificationService,
    crossWindowEventService,
  ): CardDetailsViewModel => {
    const { apiRequestError } = notificationService;
    const { getCardRequest } = cardApiService;
    const { getTransactionsRequest } = transactionApiService;
    const { on } = crossWindowEventService;

    const [selectedCard, setSelectedCard] = useImmer<RemoteData<Card>>(remoteData());
    const [relatedTransactions, setRelatedTransactions] = useImmer<RemoteData<Transaction[]>>(
      remoteData(),
    );

    const reset: CardDetailsViewModel['reset'] = useAction(() => {
      setSelectedCard(remoteData());
      setRelatedTransactions(remoteData());
    });

    const loadCard: CardDetailsViewModel['loadCard'] = useAction(async (userId, cardID) => {
      setSelectedCard((draft) => {
        draft.loading = true;
      });
      const response = await getCardRequest(userId, cardID);
      if (isSuccess(response)) {
        setSelectedCard((draft) => {
          draft.data = response.data;
          draft.loading = false;
        });
      } else {
        setSelectedCard((draft) => {
          draft.loading = false;
        });
        apiRequestError();
      }
    });

    const loadRelatedTransactions: CardDetailsViewModel['loadRelatedTransactions'] = useAction(
      async (userId, cardID) => {
        setRelatedTransactions((draft) => {
          draft.loading = true;
        });
        const response = await getTransactionsRequest(
          userId,
          { count: 5, page: 0 },
          { cardID },
          true,
        );

        if (isSuccess(response)) {
          setRelatedTransactions((draft) => {
            draft.data = response.data.items;
            draft.loading = false;
          });
        } else {
          setRelatedTransactions((draft) => {
            draft.loading = false;
          });
          apiRequestError();
        }
      },
    );

    useExhaustiveEffect(
      () =>
        on(CrossWindowEvent.LOGOUT, () => {
          setSelectedCard(remoteData({ loading: false }));
        }),
      [],
    );
    return {
      selectedCard,
      relatedTransactions,
      loadCard,
      loadRelatedTransactions,
      reset,
    };
  },
);

export const injectCardDetailsViewModel = () =>
  injectable.inject.hook<CardDetailsViewModel>()('cardDetailsViewModel');
