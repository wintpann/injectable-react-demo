import { ROUTES } from '@shared/routes';
import {
  TransactionFilter,
  TransactionListSearchParams,
} from '@modules/transactions/model/transactions.ports';
import { clean, isValidDate } from '@shared/utils/common.utils';

export const getTransactionRoute = (id: string) => ROUTES.TRANSACTION.replace(':id', id);

export const transactionListURLParamValidator = {
  [TransactionListSearchParams.cardID]: (value: string | null) =>
    value && value.match(/^[\da-zA-Z]+$/),
  [TransactionListSearchParams.cardAccount]: (value: string | null) =>
    value && value.match(/^[\da-zA-Z]+$/),
  [TransactionListSearchParams.currency]: (value: string | null) => value && value.match(/^.+$/),
  [TransactionListSearchParams.amountFrom]: (value: string | null) =>
    value && !Number.isNaN(parseFloat(value)),
  [TransactionListSearchParams.amountTo]: (value: string | null) =>
    value && !Number.isNaN(parseFloat(value)),
  [TransactionListSearchParams.dateFrom]: (value: string | null) => value && isValidDate(value),
  [TransactionListSearchParams.dateTo]: (value: string | null) => value && isValidDate(value),
};

export const getTransactionsRoute = (filter: TransactionFilter) =>
  `${ROUTES.TRANSACTIONS}?${new URLSearchParams(clean(filter))}`;

export const getTransactionsURLFilterParams = (params: URLSearchParams): TransactionFilter => {
  const filter: TransactionFilter = {};

  const cardID = params.get(TransactionListSearchParams.cardID);
  const cardAccount = params.get(TransactionListSearchParams.cardAccount);
  const currency = params.get(TransactionListSearchParams.currency);
  const amountFrom = params.get(TransactionListSearchParams.amountFrom);
  const amountTo = params.get(TransactionListSearchParams.amountTo);
  const dateFrom = params.get(TransactionListSearchParams.dateFrom);
  const dateTo = params.get(TransactionListSearchParams.dateTo);

  const isValidCardID =
    transactionListURLParamValidator[TransactionListSearchParams.cardID](cardID);
  const isValidAccountID =
    transactionListURLParamValidator[TransactionListSearchParams.cardAccount](cardAccount);
  const isValidCurrency =
    transactionListURLParamValidator[TransactionListSearchParams.currency](currency);
  const isValidAmountFrom =
    transactionListURLParamValidator[TransactionListSearchParams.amountFrom](amountFrom);
  const isValidAmountTo =
    transactionListURLParamValidator[TransactionListSearchParams.amountFrom](amountTo);
  const isValidDateFrom =
    transactionListURLParamValidator[TransactionListSearchParams.dateFrom](dateFrom);
  const isValidDateTo =
    transactionListURLParamValidator[TransactionListSearchParams.dateTo](dateTo);

  if (isValidCardID) filter.cardID = cardID as string;
  if (isValidAccountID) filter.cardAccount = cardAccount as string;
  if (isValidCurrency) filter.currency = currency as string;
  if (isValidAmountFrom) filter.amountFrom = amountFrom as string;
  if (isValidAmountTo) filter.amountTo = amountTo as string;
  if (isValidDateFrom) filter.dateFrom = new Date(dateFrom as string).toISOString();
  if (isValidDateTo) filter.dateTo = new Date(dateTo as string).toISOString();

  return filter;
};
