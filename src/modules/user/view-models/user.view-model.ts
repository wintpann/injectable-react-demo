import { useImmer } from 'use-immer';
import { injectable } from '@injectable';
import { injectUserApiService } from '@shared/services/user-api/user-api.service';
import { injectNotificationService } from '@shared/services/notification/notificaton.service';
import { injectRouterService } from '@shared/services/router/router.service';
import { injectCrossWindowService } from '@shared/services/cross-window-event/cross-window-event.service';
import { UserViewModel } from '@modules/user/model/user.ports';
import { RemoteData } from '@shared/utils/remote.utils';
import { User } from '@modules/user/model/user.model';
import { isSuccess, remoteDataWith } from '@shared/services/api/api.utils';
import { useAction } from 'injectable-react';
import { useExhaustiveEffect } from '@hooks/use-exhaustive.hook';
import { CrossWindowEvent } from '@shared/services/cross-window-event/cross-window-event.ports';

export const createUserViewModel = injectable.hook(
  injectUserApiService(),
  injectNotificationService(),
  injectCrossWindowService(),
  injectRouterService(),
  (
    userApiService,
    notificationService,
    crossWindowEventService,
    useRouterService,
  ): UserViewModel => {
    const { logInRequest, logOutRequest, getUserRequest } = userApiService;
    const { apiRequestError, success } = notificationService;
    const { fire, on } = crossWindowEventService;
    const { goHome, goCards, homeMatch } = useRouterService();

    const [remoteUser, setRemoteUser] = useImmer<RemoteData<User, { loggedIn: boolean }>>(
      remoteDataWith({ loggedIn: false }, { loading: true }),
    );

    const loadUser = useAction(async () => {
      setRemoteUser((draft) => {
        draft.loading = true;
      });
      const response = await getUserRequest();
      if (isSuccess(response)) {
        setRemoteUser({ data: response.data, loading: false, loggedIn: true });
        if (homeMatch) {
          goCards({}, true);
        }
      } else {
        goHome(true);
        setRemoteUser((draft) => {
          draft.loading = false;
        });
      }
    });

    useExhaustiveEffect(
      () =>
        on(CrossWindowEvent.LOGIN, async () => {
          await loadUser();
          goCards({}, true);
        }),
      [],
    );

    useExhaustiveEffect(
      () =>
        on(CrossWindowEvent.LOGOUT, () => {
          setRemoteUser(remoteDataWith({ loggedIn: false }, { loading: false }));
          goHome();
        }),
      [],
    );

    useExhaustiveEffect(() => {
      loadUser();
    }, []);

    const logIn: UserViewModel['logIn'] = useAction(async () => {
      setRemoteUser((draft) => {
        draft.loading = true;
      });

      const response = await logInRequest();

      if (isSuccess(response)) {
        setRemoteUser({ loading: false, data: response.data, loggedIn: true });
        success(`Welcome, ${response.data.name}!`);
        fire(CrossWindowEvent.LOGIN);
        goCards({}, true);
      } else {
        apiRequestError();
        setRemoteUser((draft) => {
          draft.loading = false;
        });
      }
    });

    const logOut: UserViewModel['logOut'] = useAction(async () => {
      setRemoteUser((draft) => {
        draft.loading = true;
      });

      const response = await logOutRequest();

      if (isSuccess(response)) {
        setRemoteUser({ loading: false, data: null, loggedIn: false });
      } else {
        apiRequestError();
        setRemoteUser((draft) => {
          draft.loading = false;
        });
      }
      fire(CrossWindowEvent.LOGOUT);
      goHome();
    });

    return { remoteUser, logIn, logOut };
  },
);

export const injectUserViewModel = () => injectable.inject.hook<UserViewModel>()('userViewModel');
