import React from 'react';
import { styled } from '@mui/material';
import { useAction } from 'injectable-react';
import { injectable } from '@injectable';
import { injectCardLookupViewModel } from '@modules/cards/view-models/card-lookup.view-model';
import { injectCardListViewModel } from '@modules/cards/view-models/card-list.view-model';
import { injectRouterService } from '@shared/services/router/router.service';
import { AuthProps } from '@shared/containers/auth.container';
import { SimpleSelect } from '@uikit/simple-select/simple-select.component';
import { Button } from '@uikit/button/button.component';
import { CardFilter } from '@modules/cards/model/cards.ports';

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

export const CardsFilterContainer = injectable.component(
  injectCardLookupViewModel(),
  injectCardListViewModel(),
  injectRouterService(),
  (useCardLookupViewModel, useCardListViewModel, useRouterService) =>
    ({ user }: AuthProps) => {
      const { cardsPaginated, setFilter, filter, loadCards } = useCardListViewModel();
      const { goCards } = useRouterService();

      const { remoteLookup } = useCardLookupViewModel();

      const onSearch = useAction(() => {
        goCards(filter, false);
        loadCards(user.id, filter);
      });

      const onReset = useAction(() => {
        goCards({}, false);
        loadCards(user.id, {});
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
              label="Account ID"
              items={remoteLookup.data?.cardAccounts || []}
              selected={filter.cardAccount}
              onChange={(cardAccount) => setFilter({ cardAccount })}
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
            <SimpleSelect
              label="Status"
              items={remoteLookup.data?.statuses || []}
              selected={filter.status}
              onChange={(status) => setFilter({ status } as CardFilter)}
            />
          </Styled.FilterItem>
          <Button loading={cardsPaginated.loading} onClick={onReset}>
            Reset
          </Button>
          <Button loading={cardsPaginated.loading} onClick={onSearch}>
            Search
          </Button>
        </Styled.Filter>
      );
    },
);
