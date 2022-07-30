import { User } from '@modules/user/model/user.model';
import { RemoteData, Response } from '@shared/utils/remote.utils';

export type UserViewModel = {
  remoteUser: RemoteData<User, { loggedIn: boolean }>;
  logIn: () => Promise<void>;
  logOut: () => Promise<void>;
};

export type UserApiService = {
  logInRequest: () => Promise<Response<User>>;
  logOutRequest: () => Promise<Response>;
  getUserRequest: () => Promise<Response<User>>;
};
