export enum CrossWindowEvent {
  LOGOUT = 'LOGOUT',
  LOGIN = 'LOGIN',
}

export type CrossWindowEventService = {
  on: (event: CrossWindowEvent, listener: () => void) => () => void;
  fire: (event: CrossWindowEvent) => void;
};
