import { useImmer } from 'use-immer';
import { injectable } from '@injectable';
import { injectCardApiService } from '@shared/services/card-api/card-api.service';
import { injectNotificationService } from '@shared/services/notification/notificaton.service';
import { injectCrossWindowService } from '@shared/services/cross-window-event/cross-window-event.service';
import { injectUserViewModel } from '@modules/user/view-models/user.view-model';
import { CardLookupViewModel, CardsLookup } from '@modules/cards/model/cards.ports';
import { RemoteData } from '@shared/utils/remote.utils';
import { isSuccess, remoteData } from '@shared/services/api/api.utils';
import { useExhaustiveEffect } from '@hooks/use-exhaustive.hook';
import { CrossWindowEvent } from '@shared/services/cross-window-event/cross-window-event.ports';
import { useAction } from 'injectable-react';

export const createCardLookupViewModel = injectable.hook(
  injectCardApiService(),
  injectNotificationService(),
  injectCrossWindowService(),
  injectUserViewModel(),
  (
    cardApiService,
    notificationService,
    crossWindowEventService,
    useUserViewModel,
  ): CardLookupViewModel => {
    const { apiRequestError } = notificationService;
    const { getCardsLookupRequest } = cardApiService;
    const { on } = crossWindowEventService;
    const { remoteUser } = useUserViewModel();

    const [remoteLookup, setRemoteLookup] = useImmer<RemoteData<CardsLookup>>(
      remoteData({ loading: true }),
    );

    useExhaustiveEffect(
      () =>
        on(CrossWindowEvent.LOGOUT, () => {
          setRemoteLookup(remoteData({ loading: false }));
        }),
      [],
    );

    const loadLookup = useAction(async (userId: string) => {
      const response = await getCardsLookupRequest(userId);
      if (isSuccess(response)) {
        setRemoteLookup({ data: response.data, loading: false });
      } else {
        apiRequestError();
      }
    });

    useExhaustiveEffect(() => {
      if (remoteUser.data?.id) {
        loadLookup(remoteUser.data.id);
      }
    }, [remoteUser.data?.id]);

    return { remoteLookup };
  },
);

export const injectCardLookupViewModel = () =>
  injectable.inject.hook<CardLookupViewModel>()('cardLookupViewModel');
