import { toast } from 'react-toastify';
import throttle from 'lodash/throttle';
import { injectable } from '@injectable';
import { NotificationService } from '@shared/services/notification/notification.ports';

export const createNotificationService = injectable.constant((): NotificationService => {
  const apiRequestError = throttle(
    () => toast.error('Something went wrong. Please contact your administrator'),
    2000,
    {
      trailing: false,
    },
  );

  const info = (message: string) => toast.info(message);
  const warn = (message: string) => toast.warn(message);
  const success = (message: string) => toast.success(message);

  return { apiRequestError, info, warn, success };
});

export const injectNotificationService = () =>
  injectable.inject.constant<NotificationService>()('notificationService');
