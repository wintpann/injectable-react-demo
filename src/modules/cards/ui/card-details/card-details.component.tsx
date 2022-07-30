import React, { FC, memo } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { css, styled } from '@mui/material';
import { getStatusColor, Status } from '@shared/utils/common.utils';
import { Link } from '@uikit/link/link.component';
import { Card } from '@modules/cards/ui/card/card.component';
import {
  TransactionProps,
  Transaction,
} from '@modules/transactions/ui/transaction/transaction.component';
import { getTransactionsRoute } from '@modules/transactions/utils/transaction.utils';

const Styled = {
  Wrapper: styled('div')`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
  `,
  Status: styled('div')<{ status: Status }>`
    width: 8px;
    height: 100%;
    border-radius: 5px;
    background-color: ${getStatusColor};
  `,
  UserIcon: styled('div')`
    margin-left: 15px;
  `,
  Block: styled('div')<{ center?: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    ${({ center }) =>
      center &&
      css`
        align-items: center;
      `}
  `,
  InfoBlock: styled('div')`
    display: flex;
  `,
  InfoKey: styled('div')`
    font-weight: bold;
    width: 150px;
  `,
  InfoValue: styled('div')<{
    size?: number;
    bold?: boolean;
    leftPad?: number;
  }>`
    ${({ size, bold, leftPad }) => css`
      font-size: ${size ?? 18}px;
      font-weight: ${bold ? 'bold' : 'normal'};
      padding-left: ${leftPad ?? 0}px;
    `}
  `,
  Balance: styled('div')`
    font-size: 25px;
  `,
  CurrentBalance: styled('div')`
    display: flex;
  `,
  MainBlock: styled('div')`
    width: 100%;
    height: 100px;
    display: flex;
  `,
  CardMini: styled('div')`
    width: 220px;
    height: 100%;

    .Card {
      display: flex;
      transform: scale(0.5) translate(-150px, -100px);
    }
  `,
  VerticalDivider: styled('div')`
    width: 1px;
    height: 100%;
    background-color: #745b5b;
    margin: 0 20px;
  `,
  TransactionsBlock: styled('div')`
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .Transaction {
      margin: 10px 0;
    }
  `,
  TransactionTitle: styled('div')`
    font-size: 20px;
    align-self: flex-start;
  `,
  TransactionLink: styled(Link)`
    font-size: 20px;
    text-decoration: underline;
    color: var(--accent-background-light-color);
  `,
};

export type CardDetailsProps = {
  cardID: string;
  cardAccount: string;
  cardNumber: string;
  expireDate: string;
  currency: string;
  status: 'active' | 'blocked';
  balance: number;
  cardholderName: string;
  relatedTransactions: TransactionProps[];
};

export const CardDetails: FC<CardDetailsProps> = memo(
  ({
    cardAccount,
    cardholderName,
    cardID,
    cardNumber,
    expireDate,
    balance,
    currency,
    status,
    relatedTransactions,
  }) => (
    <Styled.Wrapper>
      <Styled.MainBlock>
        <Styled.Status status={status === 'active' ? 'positive' : 'negative'} />
        <Styled.CardMini>
          <Card
            cardID={cardID}
            cardNumber={cardNumber}
            expireDate={expireDate}
            cardholderName={cardholderName}
            interactive={false}
          />
        </Styled.CardMini>
        <Styled.Block>
          <Styled.InfoBlock>
            <Styled.InfoKey>Card ID:&nbsp;</Styled.InfoKey>
            <Styled.InfoValue>{cardID}</Styled.InfoValue>
          </Styled.InfoBlock>
          <Styled.InfoBlock>
            <Styled.InfoKey>Account ID:&nbsp;</Styled.InfoKey>
            <Styled.InfoValue>{cardAccount}</Styled.InfoValue>
          </Styled.InfoBlock>
          <Styled.InfoBlock>
            <Styled.InfoKey>Card number:&nbsp;</Styled.InfoKey>
            <Styled.InfoValue>{cardNumber}</Styled.InfoValue>
          </Styled.InfoBlock>
        </Styled.Block>
        <Styled.VerticalDivider />
        <Styled.Block>
          <Styled.Balance>BALANCE ({currency})</Styled.Balance>
          <Styled.CurrentBalance>
            <Styled.InfoValue size={50} bold>
              {getSymbolFromCurrency(currency)}
            </Styled.InfoValue>
            <Styled.InfoValue size={50} bold leftPad={15}>
              {balance}
            </Styled.InfoValue>
          </Styled.CurrentBalance>
        </Styled.Block>
      </Styled.MainBlock>
      {relatedTransactions.length > 0 && (
        <Styled.TransactionsBlock>
          <Styled.TransactionTitle>Latest transactions</Styled.TransactionTitle>
          {relatedTransactions.map((transaction) => (
            <Transaction {...transaction} />
          ))}
          <Styled.TransactionLink to={getTransactionsRoute({ cardID })}>
            See all
          </Styled.TransactionLink>
        </Styled.TransactionsBlock>
      )}
    </Styled.Wrapper>
  ),
);

export { CardDetailsSkeleton } from './card-details.skeleton';
