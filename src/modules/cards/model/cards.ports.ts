import {
  PaginatedRemoteData,
  PaginatedRemoteResponse,
  PaginationParams,
  RemoteData,
  Response,
} from '@shared/utils/remote.utils';
import { Transaction } from '@modules/transactions/model/transactions.model';
import { Card } from '@modules/cards/model/cards.model';
import { User } from '@modules/user/model/user.model';

export type CardFilter = Partial<Pick<Card, 'cardID' | 'cardAccount' | 'currency' | 'status'>>;

export type CardsLookup = {
  cardIDs: string[];
  cardAccounts: string[];
  currencies: string[];
  statuses: [];
};

export type CardLookupViewModel = {
  remoteLookup: RemoteData<CardsLookup>;
};

export type CardListViewModel = {
  filter: CardFilter;
  setFilter: (filter: CardFilter) => void;
  cardsPaginated: PaginatedRemoteData<Card>;
  loadCards: (userId: string, filter?: CardFilter) => Promise<void>;
  loadNextCards: (userId: string) => Promise<void>;
};

export type CardDetailsViewModel = {
  selectedCard: RemoteData<Card>;
  relatedTransactions: RemoteData<Transaction[]>;
  reset: () => void;
  loadRelatedTransactions: (userId: string, cardID: Card['cardID']) => Promise<void>;
  loadCard: (userId: string, cardID: Card['cardID']) => Promise<void>;
};

export type CardApiService = {
  getCardsRequest: (
    userId: User['id'],
    pagination: PaginationParams,
    filter: CardFilter,
  ) => Promise<PaginatedRemoteResponse<Card>>;
  getCardRequest: (userId: User['id'], cardID: Card['cardID']) => Promise<Response<Card>>;
  getCardsLookupRequest: (userId: User['id']) => Promise<Response<CardsLookup>>;
};

export enum CardListSearchParams {
  cardID = 'cardID',
  cardAccount = 'cardAccount',
  currency = 'currency',
  status = 'status',
}
