import { injectable } from '@injectable';
import { failedResponse, injectApiService } from '@shared/services/api/api.service';
import { TransactionApiService } from '@modules/transactions/model/transactions.ports';
import { apiRequest } from '@shared/services/api/api.utils';

export const TransactionApiPaths = {
  GET_ALL: 'transactions',
  GET: 'transactions',
  GET_LOOKUP: 'lookup/transactions',
};

export const createTransactionApiService = injectable.constant(
  injectApiService(),
  ({ client }): TransactionApiService => {
    const getTransactionsRequest: TransactionApiService['getTransactionsRequest'] = async (
      userId,
      pagination,
      filter,
      strict,
    ) => {
      const start = pagination.page * pagination.count;
      const limit = start + pagination.count + 1;
      try {
        const commonParams = {
          userId,
          _limit: limit,
          _start: start,
          amount_gte: filter.amountFrom,
          amount_lte: filter.amountTo,
          currency: filter.currency,
          transactionDate_gte: filter.dateFrom,
          transactionDate_lte: filter.dateTo,
        };
        const params = strict
          ? {
              cardID: filter.cardID,
              cardAccount: filter.cardAccount,
              ...commonParams,
            }
          : {
              cardID_like: filter.cardID,
              cardAccount_like: filter.cardAccount,
              ...commonParams,
            };
        const { data, status } = await client.get(TransactionApiPaths.GET_ALL, {
          params,
        });
        return {
          data: {
            items: data.slice(0, limit - 1),
            hasNextPage: data.length === limit,
          },
          status,
        };
      } catch (e) {
        return failedResponse();
      }
    };

    const getTransactionRequest: TransactionApiService['getTransactionRequest'] = async (
      userId,
      transactionID,
    ) => {
      try {
        const { data, status } = await client.get(TransactionApiPaths.GET, {
          params: {
            userId,
            transactionID,
          },
        });
        return {
          data: data[0],
          status,
        };
      } catch (e) {
        return failedResponse();
      }
    };

    const getTransactionsLookupRequest: TransactionApiService['getTransactionsLookupRequest'] =
      apiRequest((userId: string) =>
        client.get(TransactionApiPaths.GET_LOOKUP, {
          params: { userId },
        }),
      );

    return {
      getTransactionsRequest,
      getTransactionRequest,
      getTransactionsLookupRequest,
    };
  },
);

export const injectTransactionApiService = () =>
  injectable.inject.constant<TransactionApiService>()('transactionApiService');
