import React, { useRef } from 'react';
import { styled } from '@mui/material';
import isEqual from 'lodash/isEqual';
import { useAction } from 'injectable-react';
import { injectable } from '@injectable';
import { injectCardListViewModel } from '@modules/cards/view-models/card-list.view-model';
import { AuthProps } from '@shared/containers/auth.container';
import { CardsFilterContainer } from '@modules/cards/containers/cards-filter.container';
import { useExhaustiveEffect } from '@hooks/use-exhaustive.hook';
import { getCardsURLFilterParams } from '@modules/cards/utils/card.utils';
import { noRemotePaginatedData } from '@shared/utils/remote.utils';
import { Card } from '@modules/cards/ui/card/card.component';
import { cardsLoadingStub } from '@modules/cards/ui/card/card.skeleton';
import { injectRouterService } from '@shared/services/router/router.service';
import { Ghost } from '@uikit/ghost/ghost.component';
import { Scrollable } from '@uikit/scrollable/scrollable.component';
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
  CardsBlock: styled('div')`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  `,
  Card: styled('div')`
    display: flex;
    justify-content: center;
    padding: 15px;
  `,
  ButtonBlock: styled('div')`
    flex: 1 0 100%;
    display: flex;
    justify-content: center;
  `,
};

export const CardsListPage = injectable.component(
  injectCardListViewModel(),
  injectRouterService(),
  CardsFilterContainer,
  (useCardListViewModel, useRouterService, CardsFilterContainer) =>
    ({ user }: AuthProps) => {
      const { cardsPaginated, loadCards, loadNextCards, filter } = useCardListViewModel();
      const { searchParams, goCards } = useRouterService();
      const loadedRef = useRef(false);

      useExhaustiveEffect(() => {
        const newFilter = getCardsURLFilterParams(searchParams);
        goCards(newFilter, true);

        const shouldLoad = !isEqual(newFilter, filter) || cardsPaginated.items.length === 0;
        if (shouldLoad) {
          loadedRef.current = true;
          loadCards(user.id, newFilter);
        }
      }, []);

      const loadMore = useAction(() => loadNextCards(user.id));

      return (
        <Styled.Wrapper>
          <Scrollable
            header={<CardsFilterContainer user={user} />}
            content={
              <Styled.CardsBlock>
                {noRemotePaginatedData(cardsPaginated) && loadedRef.current && (
                  <Ghost text="No cards found" />
                )}
                {cardsPaginated.items.map(({ cardID, cardNumber, expireDate, cardholderName }) => (
                  <Styled.Card key={cardID}>
                    <Card
                      cardID={cardID}
                      cardNumber={cardNumber}
                      expireDate={expireDate}
                      cardholderName={cardholderName}
                      interactive
                    />
                  </Styled.Card>
                ))}
                {cardsPaginated.loading && cardsLoadingStub}
                <Styled.ButtonBlock>
                  {cardsPaginated.hasNextPage && (
                    <Button
                      loading={cardsPaginated.loading}
                      onClick={loadMore}
                      className="LoadMoreButton"
                    >
                      Load More
                    </Button>
                  )}
                </Styled.ButtonBlock>
              </Styled.CardsBlock>
            }
          />
        </Styled.Wrapper>
      );
    },
);
