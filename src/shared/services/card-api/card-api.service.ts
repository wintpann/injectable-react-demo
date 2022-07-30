import { failedResponse, injectApiService } from '@shared/services/api/api.service';
import { injectable } from '@injectable';
import { CardApiService } from '@modules/cards/model/cards.ports';
import { apiRequest } from '@shared/services/api/api.utils';

export const CardApiPaths = {
  GET_ALL: 'cards',
  GET: 'cards',
  GET_LOOKUP: 'lookup/cards',
};

export const createCardApiService = injectable.constant(
  injectApiService(),
  ({ client }): CardApiService => {
    const getCardsRequest: CardApiService['getCardsRequest'] = async (
      userId,
      pagination,
      filter,
    ) => {
      const start = pagination.page * pagination.count;
      const limit = start + pagination.count + 1;
      try {
        const { data, status } = await client.get(CardApiPaths.GET_ALL, {
          params: {
            userId,
            _limit: limit,
            _start: start,
            cardID_like: filter.cardID,
            cardAccount_like: filter.cardAccount,
            currency: filter.currency,
            status: filter.status,
          },
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

    const getCardRequest: CardApiService['getCardRequest'] = async (userId, cardID) => {
      try {
        const { data, status } = await client.get(CardApiPaths.GET, {
          params: {
            userId,
            cardID,
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

    const getCardsLookupRequest: CardApiService['getCardsLookupRequest'] = apiRequest(
      (userId: string) => client.get(CardApiPaths.GET_LOOKUP, { params: { userId } }),
    );

    return {
      getCardsRequest,
      getCardsLookupRequest,
      getCardRequest,
    };
  },
);

export const injectCardApiService = () =>
  injectable.inject.constant<CardApiService>()('cardApiService');
