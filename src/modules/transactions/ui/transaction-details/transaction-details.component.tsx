import React, { FC, memo } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { css, styled } from '@mui/material';
import { formatDate, getStatusColor, Status } from '@shared/utils/common.utils';
import { Card } from '@modules/cards/ui/card/card.component';

const Styled = {
  Wrapper: styled('div')`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
  `,
  MainBlock: styled('div')`
    display: flex;
    height: 100px;
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
  Block: styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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
  CompanyName: styled('div')`
    font-size: 25px;
  `,
  Amount: styled('div')<{ status: Status }>`
    display: flex;
    color: ${getStatusColor};
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
};

export type TransactionDetailsProps = {
  cardStatus: 'active' | 'blocked';
  transactionID: string;
  cardID: string;
  cardNumber: string;
  cardExpireDate: string;
  cardholderName: string;
  amount: number;
  currency: string;
  transactionDate: string;
  merchantInfo: {
    companyName: string;
    address: [number, number];
  };
};

export const TransactionDetails: FC<TransactionDetailsProps> = memo(
  ({
    cardholderName,
    cardID,
    cardNumber,
    cardExpireDate,
    amount,
    currency,
    cardStatus,
    merchantInfo,
    transactionDate,
    transactionID,
  }) => {
    const status = amount > 0 ? 'positive' : 'negative';

    return (
      <Styled.Wrapper>
        <Styled.MainBlock>
          <Styled.Status status={cardStatus === 'active' ? 'positive' : 'negative'} />
          <Styled.CardMini>
            <Card
              cardID={cardID}
              cardNumber={cardNumber}
              expireDate={cardExpireDate}
              cardholderName={cardholderName}
              interactive
              animated={false}
            />
          </Styled.CardMini>
          <Styled.Block>
            <Styled.InfoBlock>
              <Styled.InfoKey>Transaction ID:&nbsp;</Styled.InfoKey>
              <Styled.InfoValue>{transactionID}</Styled.InfoValue>
            </Styled.InfoBlock>
            <Styled.InfoBlock>
              <Styled.InfoKey>Transaction Date:&nbsp;</Styled.InfoKey>
              <Styled.InfoValue>{formatDate(transactionDate)}</Styled.InfoValue>
            </Styled.InfoBlock>
            <Styled.InfoBlock>
              <Styled.InfoKey>Card number:&nbsp;</Styled.InfoKey>
              <Styled.InfoValue>{cardNumber}</Styled.InfoValue>
            </Styled.InfoBlock>
          </Styled.Block>
          <Styled.VerticalDivider />
          <Styled.Block>
            <Styled.CompanyName>{merchantInfo.companyName}</Styled.CompanyName>
            <Styled.Amount status={status}>
              <Styled.InfoValue size={50} bold>
                {status === 'positive' && '+'}
                {amount}
              </Styled.InfoValue>
              <Styled.InfoValue size={50} bold leftPad={15}>
                {getSymbolFromCurrency(currency)}
              </Styled.InfoValue>
            </Styled.Amount>
          </Styled.Block>
        </Styled.MainBlock>
      </Styled.Wrapper>
    );
  },
);

export { TransactionDetailsSkeleton } from './transaction-details.skeleton';
