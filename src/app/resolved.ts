import { createConfig } from '@shared/constants/config/config.constant';
import { createNotificationService } from '@shared/services/notification/notificaton.service';
import { createRouterService } from '@shared/services/router/router.service';
import { createCrossEventWindowService } from '@shared/services/cross-window-event/cross-window-event.service';
import { createApiService } from '@shared/services/api/api.service';
import { createUserApiService } from '@shared/services/user-api/user-api.service';
import { createTransactionApiService } from '@shared/services/transaction-api/transaction-api.service';
import { createCardApiService } from '@shared/services/card-api/card-api.service';
import { createUserViewModel } from '@modules/user/view-models/user.view-model';
import { createCardLookupViewModel } from '@modules/cards/view-models/card-lookup.view-model';
import { createCardListViewModel } from '@modules/cards/view-models/card-list.view-model';
import { createCardDetailsViewModel } from '@modules/cards/view-models/card-details.view-model';
import { createTransactionListViewModel } from '@modules/transactions/view-models/transaction-list.view-model';
import { createTransactionDetailsViewModel } from '@modules/transactions/view-models/transaction-details.view-model';
import { createTransactionLookupViewModel } from '@modules/transactions/view-models/transaction-lookup.view-model';

const config = createConfig();
const notificationService = createNotificationService();
const routerService = createRouterService();
const crossWindowEventService = createCrossEventWindowService();

const apiService = createApiService({ config });
const userApiService = createUserApiService({ apiService });
const transactionApiService = createTransactionApiService({ apiService });
const cardApiService = createCardApiService({ apiService });

const userViewModel = createUserViewModel({
  userApiService,
  notificationService,
  routerService,
  crossWindowEventService,
});

const cardLookupViewModel = createCardLookupViewModel({
  cardApiService,
  notificationService,
  crossWindowEventService,
  userViewModel,
});

const cardListViewModel = createCardListViewModel({
  cardApiService,
  notificationService,
  crossWindowEventService,
});

const cardDetailsViewModel = createCardDetailsViewModel({
  cardApiService,
  transactionApiService,
  notificationService,
  crossWindowEventService,
});

const transactionLookupViewModel = createTransactionLookupViewModel({
  crossWindowEventService,
  userViewModel,
  transactionApiService,
  notificationService,
});

const transactionListViewModel = createTransactionListViewModel({
  transactionApiService,
  notificationService,
  crossWindowEventService,
});
const transactionDetailsViewModel = createTransactionDetailsViewModel({
  transactionApiService,
  notificationService,
  crossWindowEventService,
});

export const resolved = {
  config,
  notificationService,
  routerService,
  crossWindowEventService,
  apiService,
  userApiService,
  transactionApiService,
  cardApiService,
  userViewModel,
  cardLookupViewModel,
  cardListViewModel,
  cardDetailsViewModel,
  transactionLookupViewModel,
  transactionListViewModel,
  transactionDetailsViewModel,
} as const;
