import React, { useRef } from 'react';
import { styled } from '@mui/material';
import { injectable } from '@injectable';
import { injectTransactionDetailsViewModel } from '@modules/transactions/view-models/transaction-details.view-model';
import { injectRouterService } from '@shared/services/router/router.service';
import { useExhaustiveEffect } from '@hooks/use-exhaustive.hook';
import { noRemoteData } from '@shared/utils/remote.utils';
import { Ghost } from '@uikit/ghost/ghost.component';
import {
  TransactionDetails,
  TransactionDetailsSkeleton,
} from '@modules/transactions/ui/transaction-details/transaction-details.component';
import { AuthProps } from '@shared/containers/auth.container';

const Styled = {
  Wrapper: styled('div')`
    display: flex;
    height: 100%;
  `,
};

export const TransactionDetailsPage = injectable.component(
  injectTransactionDetailsViewModel(),
  injectRouterService(),
  (useTransactionDetailsViewModel, useRouterService) =>
    ({ user }: AuthProps) => {
      const { selectedTransaction, loadTransaction, reset } = useTransactionDetailsViewModel();
      const { transactionDetailsMatch } = useRouterService();
      const loadedRef = useRef(false);

      useExhaustiveEffect(() => {
        if (transactionDetailsMatch?.params.id) {
          loadTransaction(user.id, transactionDetailsMatch.params.id);
          loadedRef.current = true;
        }

        return reset;
      }, [transactionDetailsMatch?.params.id]);

      return (
        <Styled.Wrapper>
          {noRemoteData(selectedTransaction) && loadedRef.current && (
            <Ghost text="No transaction found" />
          )}
          {selectedTransaction.data && <TransactionDetails {...selectedTransaction.data} />}
          {selectedTransaction.loading && <TransactionDetailsSkeleton />}
        </Styled.Wrapper>
      );
    },
);
