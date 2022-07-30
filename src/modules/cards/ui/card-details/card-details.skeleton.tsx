import React, { FC, memo } from 'react';
import { styled } from '@mui/material';
import { Skeleton } from '@uikit/skeleton/skeleton.component';
import { CardSkeleton } from '@modules/cards/ui/card/card.component';
import { transactionsLoadingStub } from '@modules/transactions/ui/transaction/transaction.skeleton';

const SkeletonStyled = {
  Wrapper: styled('div')`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    overflow: auto;
  `,
  DetailsBlock: styled('div')`
    width: 100%;
    height: 100px;
    display: flex;
  `,
  TransactionsBlock: styled('div')`
    width: 100%;
    margin: 20px 0;

    .SkeletonTitle {
      margin: 10px 0;
    }
  `,
  Status: styled(Skeleton)`
    width: 8px;
    height: 100%;
    border-radius: 5px;
  `,
  Card: styled('div')`
    height: 100px;
    width: 220px;

    .CardSkeleton {
      transform: scale(0.5) translate(-150px, -100px);
    }
  `,
  Info: styled('div')`
    width: 330px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  `,
  Divider: styled('div')`
    margin: 0 20px;
  `,
  BalanceBlock: styled('div')`
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  `,
};

export const CardDetailsSkeleton: FC = memo(() => (
  <SkeletonStyled.Wrapper>
    <SkeletonStyled.DetailsBlock>
      <SkeletonStyled.Status />
      <SkeletonStyled.Card>
        <CardSkeleton className="CardSkeleton" />
      </SkeletonStyled.Card>
      <SkeletonStyled.Info>
        <Skeleton height="20px" radius="5px" />
        <Skeleton height="20px" radius="5px" />
        <Skeleton height="20px" radius="5px" />
      </SkeletonStyled.Info>
      <SkeletonStyled.Divider>
        <Skeleton width="1px" />
      </SkeletonStyled.Divider>
      <SkeletonStyled.BalanceBlock>
        <Skeleton height="30px" radius="5px" />
        <Skeleton height="50px" radius="5px" />
      </SkeletonStyled.BalanceBlock>
    </SkeletonStyled.DetailsBlock>
    <SkeletonStyled.TransactionsBlock>
      <Skeleton width="180px" height="20px" radius="5px" className="SkeletonTitle" />
      {transactionsLoadingStub}
    </SkeletonStyled.TransactionsBlock>
  </SkeletonStyled.Wrapper>
));
