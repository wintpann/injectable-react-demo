import { injectable } from '@injectable';
import { injectApiService } from '@shared/services/api/api.service';
import { UserApiService } from '@modules/user/model/user.ports';
import { apiRequest } from '@shared/services/api/api.utils';

export enum UserApiPaths {
  LOGIN = 'user/login',
  LOGOUT = 'user/logout',
  GET_USER = 'user',
}

export const createUserApiService = injectable.constant(
  injectApiService(),
  ({ client }): UserApiService => {
    const logInRequest: UserApiService['logInRequest'] = apiRequest(() =>
      client.post(UserApiPaths.LOGIN),
    );

    const logOutRequest: UserApiService['logOutRequest'] = apiRequest(() =>
      client.post(UserApiPaths.LOGOUT),
    );

    const getUserRequest: UserApiService['getUserRequest'] = apiRequest(() =>
      client.get(UserApiPaths.GET_USER),
    );

    return { logInRequest, logOutRequest, getUserRequest };
  },
);

export const injectUserApiService = () =>
  injectable.inject.constant<UserApiService>()('userApiService');
