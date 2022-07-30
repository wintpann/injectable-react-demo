import { PathMatch } from 'react-router-dom';
import { CardFilter } from '@modules/cards/model/cards.ports';
import { TransactionFilter } from '@modules/transactions/model/transactions.ports';

export type RouterService = {
  goHome: (replace?: boolean) => void;
  goCards: (filter: CardFilter, replace: boolean) => void;
  goTransactions: (filter: TransactionFilter, replace: boolean) => void;
  breadcrumbs: Array<{ path: string; title: string }>;
  transactionDetailsMatch: PathMatch<'id'> | null;
  cardDetailsMatch: PathMatch<'id'> | null;
  homeMatch: PathMatch | null;
  searchParams: URLSearchParams;
};
