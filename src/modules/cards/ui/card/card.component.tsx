import React, { FC, memo } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { css, styled } from '@mui/material';
import { Link } from '@uikit/link/link.component';
import { getCardRoute } from '@modules/cards/utils/card.utils';

export type CardProps = {
  cardID: string;
  cardNumber: string;
  expireDate: string;
  cardholderName: string;
  interactive: boolean;
  animated?: boolean;
};

const Styled = {
  Wrapper: styled(Link)<{ interactive: boolean; animated?: boolean }>`
    display: flex;
    width: 350px;
    height: 200px;
    box-shadow: 0 0 10px var(--background-color);
    border-radius: 15px;

    & .rccs,
    .rccs__card {
      width: 100%;
      height: 100%;
    }

    transition: transform 0.3s;

    ${({ interactive }) =>
      interactive
        ? css`
            cursor: pointer;
          `
        : css`
            pointer-events: none;
          `}

    ${({ animated }) =>
      animated &&
      css`
        &:hover {
          transform: scale(1.05);
        }
      `}
  `,
};

export const Card: FC<CardProps> = memo(
  ({ cardNumber, expireDate, cardholderName, cardID, interactive, animated = true }) => (
    <Styled.Wrapper
      to={getCardRoute(cardID)}
      className="Card"
      interactive={interactive}
      animated={animated}
    >
      <Cards name={cardholderName} cvc="000" expiry={expireDate} number={cardNumber} />
    </Styled.Wrapper>
  ),
);

export { CardSkeleton } from './card.skeleton';
