import React, { useRef } from 'react';
import { styled } from '@mui/material';
import { useAction } from 'injectable-react';
import isEqual from 'lodash/isEqual';
import { injectable } from '@injectable';
import { injectTransactionListViewModel } from '@modules/transactions/view-models/transaction-list.view-model';
import { injectRouterService } from '@shared/services/router/router.service';
import { TransactionsFilterContainer } from '@modules/transactions/containers/transaction-list-filter.container';
import { AuthProps } from '@shared/containers/auth.container';
import { useExhaustiveEffect } from '@hooks/use-exhaustive.hook';
import { getTransactionsURLFilterParams } from '@modules/transactions/utils/transaction.utils';
import { Scrollable } from '@uikit/scrollable/scrollable.component';
import { noRemotePaginatedData } from '@shared/utils/remote.utils';
import { Ghost } from '@uikit/ghost/ghost.component';
import { Transaction } from '@modules/transactions/ui/transaction/transaction.component';
import { transactionsLoadingStub } from '@modules/transactions/ui/transaction/transaction.skeleton';
import { Button } from '@uikit/button/button.component';

const Styled = {
  Wrapper: styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    .LoadMoreButton {
      margin-top: auto;
      width: 300px;
    }
  `,
  TransactionsBlock: styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  Transaction: styled('div')`
    padding: 5px 0;
    display: flex;
    justify-content: center;
  `,
  ButtonBlock: styled('div')`
    display: flex;
    justify-content: center;
    margin-top: auto;
  `,
};

export const TransactionsListPage = injectable.component(
  injectTransactionListViewModel(),
  injectRouterService(),
  TransactionsFilterContainer,
  (useTransactionListService, useRouterService, TransactionsFilterContainer) =>
    ({ user }: AuthProps) => {
      const { transactionsPaginated, loadTransactions, loadNextTransactions, filter } =
        useTransactionListService();
      const { searchParams, goTransactions } = useRouterService();
      const loadedRef = useRef(false);

      useExhaustiveEffect(() => {
        const newFilter = getTransactionsURLFilterParams(searchParams);
        goTransactions(newFilter, true);

        const shouldLoad = !isEqual(newFilter, filter) || transactionsPaginated.items.length === 0;

        if (shouldLoad) {
          loadedRef.current = true;
          loadTransactions(user.id, newFilter);
        }
      }, []);

      const loadMore = useAction(() => loadNextTransactions(user.id));

      return (
        <Styled.Wrapper>
          <Scrollable
            header={<TransactionsFilterContainer user={user} />}
            content={
              <Styled.TransactionsBlock>
                {noRemotePaginatedData(transactionsPaginated) && loadedRef.current && (
                  <Ghost text="No transactions found" />
                )}
                {transactionsPaginated.items.map(
                  ({ transactionDate, transactionID, amount, currency }) => (
                    <Styled.Transaction key={transactionID}>
                      <Transaction
                        transactionID={transactionID}
                        amount={amount}
                        currency={currency}
                        transactionDate={transactionDate}
                      />
                    </Styled.Transaction>
                  ),
                )}
                {transactionsPaginated.loading && transactionsLoadingStub}
                <Styled.ButtonBlock>
                  {transactionsPaginated.hasNextPage && (
                    <Button
                      loading={transactionsPaginated.loading}
                      onClick={loadMore}
                      className="LoadMoreButton"
                    >
                      Load More
                    </Button>
                  )}
                </Styled.ButtonBlock>
              </Styled.TransactionsBlock>
            }
          />
        </Styled.Wrapper>
      );
    },
);
