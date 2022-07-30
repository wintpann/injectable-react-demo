import { injectable } from '@injectable';
import { CrossWindowEventService } from '@shared/services/cross-window-event/cross-window-event.ports';

const customEventName = (key: string) => `CUSTOM-${key}`;

export const createCrossEventWindowService = injectable.constant((): CrossWindowEventService => {
  const on: CrossWindowEventService['on'] = (event, listener) => {
    const storageListener = (e: StorageEvent) => {
      if (e.key === event) {
        listener();
      }
    };

    window.addEventListener('storage', storageListener);
    window.addEventListener(customEventName(event), listener);
    return () => {
      window.removeEventListener('storage', storageListener);
      window.removeEventListener(customEventName(event), listener);
    };
  };

  const fire: CrossWindowEventService['fire'] = (event) => {
    localStorage.setItem(event, new Date().getTime().toString());
    window.dispatchEvent(new CustomEvent(customEventName(event)));
  };

  return {
    on,
    fire,
  };
});

export const injectCrossWindowService = () =>
  injectable.inject.constant<CrossWindowEventService>()('crossWindowEventService');
