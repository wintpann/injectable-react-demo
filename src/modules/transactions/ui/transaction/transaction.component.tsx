import React, { FC, memo } from 'react';
import { css, styled } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { formatDate, Status } from '@shared/utils/common.utils';
import { Link } from '@uikit/link/link.component';
import { getTransactionRoute } from '@modules/transactions/utils/transaction.utils';

export type TransactionProps = {
  transactionID: string;
  amount: number;
  currency: string;
  transactionDate: string;
};

const Styled = {
  Wrapper: styled(Link)<{ status: Status }>`
    width: 100%;
    padding: 10px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    height: 65px;
    ${({ status }) =>
      status === 'positive'
        ? css`
            background-color: #294629;

            &:hover {
              background-color: #2f572f;
            }
          `
        : css`
            background-color: #462a2a;

            &:hover {
              background-color: #572d2d;
            }
          `}
  `,
  DateBlock: styled('div')`
    display: flex;
    align-items: center;
  `,
  Amount: styled('div')<{ status: Status }>`
    display: flex;
    align-items: center;
    font-size: 24px;

    .IconButton {
      margin-left: 10px;
    }

    ${({ status }) =>
      status === 'positive' &&
      css`
        &::before {
          content: '+';
        }
      `}
  `,
  Currency: styled('div')`
    font-weight: bold;
    padding: 5px;
    margin: 0 10px;
    font-size: 14px;
  `,
  Icon: styled('div')`
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 50%;
    background-color: inherit;
  `,
  Date: styled('div')`
    margin-left: 10px;
  `,
};

export const Transaction: FC<TransactionProps> = memo(
  ({ transactionDate, transactionID, amount, currency }) => {
    const status = amount > 0 ? 'positive' : 'negative';

    return (
      <Styled.Wrapper
        to={getTransactionRoute(transactionID)}
        status={status}
        className="Transaction"
      >
        <Styled.DateBlock>
          <Styled.Icon>
            <AccessTimeIcon />
          </Styled.Icon>
          <Styled.Date>{formatDate(transactionDate)}</Styled.Date>
        </Styled.DateBlock>
        <Styled.Amount status={status}>
          {amount}
          <Styled.Currency>{currency}</Styled.Currency>
          <Styled.Icon>
            <AccountBalanceIcon />
          </Styled.Icon>
        </Styled.Amount>
      </Styled.Wrapper>
    );
  },
);
