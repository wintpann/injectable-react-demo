import React, { FC, memo, ReactNode } from 'react';
import { styled } from '@mui/material';
import { Widget } from '@uikit/layout/widget/layout-widget.component';

const Styled = {
  Content: styled('div')`
    flex: 1 0 100%;
    height: calc(100% - 80px);
  `,
  Logo: styled('div')`
    margin: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Header: styled('div')`
    display: flex;
    flex: 1 0 100%;
    align-items: center;
    margin-bottom: 15px;
    height: 65px;
  `,
  User: styled('div')`
    margin-left: auto;
    flex: 0 0 250px;
  `,
  Main: styled('div')`
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    margin-left: 15px;
  `,
  Breadcrumbs: styled('div')``,
  Menu: styled('div')`
    flex: 0 0 250px;
  `,
  Root: styled('div')`
    height: 100%;
    padding: 15px;
    background-color: var(--background-color);
    color: var(--text-color);
    display: flex;
  `,
};

export type DesktopLayoutProps = {
  Menu: ReactNode;
  Logo: ReactNode;
  Breadcrumbs: ReactNode;
  User: ReactNode;
  Main: ReactNode;
};

export const DesktopLayout: FC<DesktopLayoutProps> = memo(
  ({ Logo, Menu, Breadcrumbs, User, Main }) => (
    <Styled.Root>
      <Styled.Menu>
        <Widget>
          <Styled.Logo>{Logo}</Styled.Logo>
          {Menu}
        </Widget>
      </Styled.Menu>
      <Styled.Main>
        <Styled.Header>
          <Styled.Breadcrumbs>
            <Widget transparent>{Breadcrumbs}</Widget>
          </Styled.Breadcrumbs>
          <Styled.User>
            <Widget>{User}</Widget>
          </Styled.User>
        </Styled.Header>
        <Styled.Content>
          <Widget>{Main}</Widget>
        </Styled.Content>
      </Styled.Main>
    </Styled.Root>
  ),
);
