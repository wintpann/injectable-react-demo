import React from 'react';
import { styled } from '@mui/material';
import { useAction } from 'injectable-react';
import { injectable } from '@injectable';
import { injectTransactionLookupViewModel } from '@modules/transactions/view-models/transaction-lookup.view-model';
import { injectTransactionListViewModel } from '@modules/transactions/view-models/transaction-list.view-model';
import { injectRouterService } from '@shared/services/router/router.service';
import { AuthProps } from '@shared/containers/auth.container';
import { NumberInput } from '@uikit/number-input/number-input.component';
import { SimpleSelect } from '@uikit/simple-select/simple-select.component';
import { Datepicker } from '@uikit/datepicker/datepicker.component';
import { Button } from '@uikit/button/button.component';

const Styled = {
  Filter: styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;

    .Button {
      flex: 0 0 150px;
      margin: 0 10px;
    }
  `,
  FilterItem: styled('div')`
    flex: 1 0 150px;
    padding: 10px;
  `,
};

export const TransactionsFilterContainer = injectable.component(
  injectTransactionLookupViewModel(),
  injectTransactionListViewModel(),
  injectRouterService(),
  (useTransactionLookupViewModel, useTransactionListViewModel, useRouterService) =>
    ({ user }: AuthProps) => {
      const { transactionsPaginated, loadTransactions, filter, setFilter } =
        useTransactionListViewModel();
      const { goTransactions } = useRouterService();

      const { remoteLookup } = useTransactionLookupViewModel();

      const onSearch = useAction(() => {
        goTransactions(filter, false);
        loadTransactions(user.id, filter);
      });

      const onReset = useAction(() => {
        goTransactions({}, false);
        loadTransactions(user.id, {});
      });

      return (
        <Styled.Filter>
          <Styled.FilterItem>
            <SimpleSelect
              label="Card ID"
              items={remoteLookup.data?.cardIDs || []}
              selected={filter.cardID}
              onChange={(cardID) => setFilter({ cardID })}
            />
          </Styled.FilterItem>
          <Styled.FilterItem>
            <SimpleSelect
              label="Card Account"
              items={remoteLookup.data?.cardAccounts || []}
              selected={filter.cardAccount}
              onChange={(cardAccount) => setFilter({ cardAccount })}
            />
          </Styled.FilterItem>
          <Styled.FilterItem>
            <NumberInput
              value={filter.amountFrom}
              onChange={(amountFrom) => setFilter({ amountFrom })}
              label="Amount From"
            />
          </Styled.FilterItem>
          <Styled.FilterItem>
            <NumberInput
              value={filter.amountTo}
              onChange={(amountTo) => setFilter({ amountTo })}
              label="Amount To"
            />
          </Styled.FilterItem>
          <Styled.FilterItem>
            <SimpleSelect
              label="Currency"
              items={remoteLookup.data?.currencies || []}
              selected={filter.currency}
              onChange={(currency) => setFilter({ currency })}
            />
          </Styled.FilterItem>
          <Styled.FilterItem>
            <Datepicker
              label="From"
              value={filter.dateFrom}
              onChange={(dateFrom) => setFilter({ dateFrom })}
            />
          </Styled.FilterItem>
          <Styled.FilterItem>
            <Datepicker
              label="To"
              value={filter.dateTo}
              onChange={(dateTo) => setFilter({ dateTo })}
            />
          </Styled.FilterItem>
          <Button loading={transactionsPaginated.loading} onClick={onReset}>
            Reset
          </Button>
          <Button loading={transactionsPaginated.loading} onClick={onSearch}>
            Search
          </Button>
        </Styled.Filter>
      );
    },
);
