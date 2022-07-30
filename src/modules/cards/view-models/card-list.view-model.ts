import { useAction } from 'injectable-react';
import { injectable } from '@injectable';
import { CardFilter, CardListViewModel } from '@modules/cards/model/cards.ports';
import { injectCardApiService } from '@shared/services/card-api/card-api.service';
import { injectNotificationService } from '@shared/services/notification/notificaton.service';
import { injectCrossWindowService } from '@shared/services/cross-window-event/cross-window-event.service';
import { PaginatedRemoteData } from '@shared/utils/remote.utils';
import { Card } from '@modules/cards/model/cards.model';
import { usePaginatedRemoteDataWith } from '@shared/services/api/api.utils';
import { useExhaustiveEffect } from '@hooks/use-exhaustive.hook';
import { CrossWindowEvent } from '@shared/services/cross-window-event/cross-window-event.ports';

export const emptyCardFilter: CardFilter = {};

export const createCardListViewModel = injectable.hook(
  injectCardApiService(),
  injectNotificationService(),
  injectCrossWindowService(),
  (cardApiService, notificationService, crossWindowEventService): CardListViewModel => {
    const { apiRequestError } = notificationService;
    const { getCardsRequest } = cardApiService;
    const { on } = crossWindowEventService;

    const getCards = useAction(
      async (state: PaginatedRemoteData<Card, { filter: CardFilter; userId: string }>) =>
        await getCardsRequest(state.userId, { page: state.page, count: state.count }, state.filter),
    );

    const {
      state: cardsPaginated,
      load: loadCardList,
      reset: resetCardsPaginated,
      setState: setCardsPaginated,
      loadNext: loadNextCardList,
    } = usePaginatedRemoteDataWith<Card, { filter: CardFilter; userId: string }>({
      additional: { filter: emptyCardFilter, userId: '' },
      initial: { count: 10 },
      onFailure: apiRequestError,
      getData: getCards,
    });

    useExhaustiveEffect(
      () =>
        on(CrossWindowEvent.LOGOUT, () => {
          resetCardsPaginated();
        }),
      [],
    );

    const loadCards: CardListViewModel['loadCards'] = useAction(async (userId, filter) => {
      await loadCardList({ filter, userId });
    });

    const loadNextCards: CardListViewModel['loadNextCards'] = useAction(async (userId) => {
      await loadNextCardList({ userId });
    });

    const setFilter: CardListViewModel['setFilter'] = useAction((filter) => {
      setCardsPaginated((prev) => ({ filter: { ...prev.filter, ...filter } }));
    });

    return {
      cardsPaginated,
      loadCards,
      loadNextCards,
      filter: cardsPaginated.filter,
      setFilter,
    };
  },
);

export const injectCardListViewModel = () =>
  injectable.inject.hook<CardListViewModel>()('cardListViewModel');
