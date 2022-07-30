import {
  PaginatedRemoteData,
  PaginatedRemoteResponse,
  PaginationParams,
  RemoteData,
  Response,
} from '@shared/utils/remote.utils';
import { Transaction } from '@modules/transactions/model/transactions.model';
import { User } from '@modules/user/model/user.model';

export type TransactionFilter = Partial<
  Pick<Transaction, 'cardID' | 'cardAccount' | 'currency'> & {
    amountFrom: string;
    amountTo: string;
    dateFrom: string;
    dateTo: string;
  }
>;

export type TransactionsLookup = {
  cardIDs: string[];
  cardAccounts: string[];
  currencies: string[];
};

export type TransactionLookupViewModel = {
  remoteLookup: RemoteData<TransactionsLookup>;
};

export type TransactionListViewModel = {
  filter: TransactionFilter;
  setFilter: (filter: TransactionFilter) => void;
  transactionsPaginated: PaginatedRemoteData<Transaction>;
  loadTransactions: (userId: string, filter?: TransactionFilter) => Promise<void>;
  loadNextTransactions: (userId: string) => Promise<void>;
};

export type TransactionDetailsViewModel = {
  selectedTransaction: RemoteData<Transaction>;
  loadTransaction: (userId: string, transactionID: Transaction['transactionID']) => Promise<void>;
  reset: () => void;
};

export type TransactionApiService = {
  getTransactionsRequest: (
    userId: User['id'],
    pagination: PaginationParams,
    filter: TransactionFilter,
    strict: boolean,
  ) => Promise<PaginatedRemoteResponse<Transaction>>;
  getTransactionRequest: (
    userId: User['id'],
    id: Transaction['transactionID'],
  ) => Promise<Response<Transaction>>;
  getTransactionsLookupRequest: (userId: User['id']) => Promise<Response<TransactionsLookup>>;
};

export enum TransactionListSearchParams {
  cardID = 'cardID',
  cardAccount = 'cardAccount',
  currency = 'currency',
  amountFrom = 'amountFrom',
  amountTo = 'amountTo',
  dateFrom = 'dateFrom',
  dateTo = 'dateTo',
}
