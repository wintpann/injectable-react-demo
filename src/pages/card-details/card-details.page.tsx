import React, { useRef } from 'react';
import { injectable } from '@injectable';
import { AuthProps } from '@shared/containers/auth.container';
import { injectCardDetailsViewModel } from '@modules/cards/view-models/card-details.view-model';
import { styled } from '@mui/material';
import { useExhaustiveEffect } from '@hooks/use-exhaustive.hook';
import { noRemoteData, noRemoteListData } from '@shared/utils/remote.utils';
import { Ghost } from '@uikit/ghost/ghost.component';
import {
  CardDetails,
  CardDetailsSkeleton,
} from '@modules/cards/ui/card-details/card-details.component';
import { injectRouterService } from '@shared/services/router/router.service';

const Styled = {
  Wrapper: styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  `,
};

export const CardDetailsPage = injectable.component(
  injectCardDetailsViewModel(),
  injectRouterService(),
  (useCardDetailsViewModel, useRouterService) =>
    ({ user }: AuthProps) => {
      const { selectedCard, loadCard, loadRelatedTransactions, relatedTransactions, reset } =
        useCardDetailsViewModel();
      const { cardDetailsMatch } = useRouterService();
      const loadedRef = useRef(false);

      useExhaustiveEffect(() => {
        if (cardDetailsMatch?.params.id) {
          loadCard(user.id, cardDetailsMatch.params.id);
          loadRelatedTransactions(user.id, cardDetailsMatch?.params.id);
          loadedRef.current = true;
        }

        return reset;
      }, [cardDetailsMatch?.params.id]);

      return (
        <Styled.Wrapper>
          {noRemoteData(selectedCard) && loadedRef.current && <Ghost text="No card found" />}
          {selectedCard.data && (
            <CardDetails
              {...selectedCard.data}
              relatedTransactions={relatedTransactions.data || []}
            />
          )}
          {selectedCard.loading && <CardDetailsSkeleton />}
          {selectedCard.data && noRemoteListData(relatedTransactions) && (
            <Ghost text="No related transactions" />
          )}
        </Styled.Wrapper>
      );
    },
);
