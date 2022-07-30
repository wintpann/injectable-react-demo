export type NotificationService = {
  apiRequestError: () => void;
  info: (message: string) => void;
  warn: (message: string) => void;
  success: (message: string) => void;
};
