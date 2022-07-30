import axios from 'axios';
import { injectConfig } from '@shared/constants/config/config.constant';
import { injectable } from '@injectable';
import { ApiService } from '@shared/services/api/api.ports';
import { FailedResponse } from '@shared/utils/remote.utils';

export const createApiService = injectable.constant(
  injectConfig(),
  (config): ApiService => ({ client: axios.create({ baseURL: config.apiURL }) }),
);

export const injectApiService = () => injectable.inject.constant<ApiService>()('apiService');

export const failedResponse = (): FailedResponse => null;
