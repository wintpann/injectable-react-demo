import { injectable } from '@injectable';
import { Config } from '@shared/constants/config/config.ports';

export const createConfig = injectable.constant(
  (): Config => ({
    apiURL: 'http://localhost:4000',
  }),
);

export const injectConfig = () => injectable.inject.constant<Config>()('config');
