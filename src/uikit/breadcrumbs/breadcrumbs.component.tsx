import React, { FC, memo } from 'react';
import MUIBreadcrumbs from '@mui/material/Breadcrumbs';
import { css, styled } from '@mui/material';
import { Link } from '@uikit/link/link.component';

type BreadcrumbsProps = {
  items: Array<{ title: string; path: string }>;
};

const Styled = {
  Wrapper: styled(MUIBreadcrumbs)`
    color: var(--text-color);
    font-size: 18px;
    background-color: var(--background-color);
  `,
  Link: styled(Link)<{ last: boolean }>`
    border-radius: 5px;
    padding: 3px;
    pointer-events: none;
    ${({ last }) =>
      !last &&
      css`
        pointer-events: all;

        &:hover {
          background-color: var(--text-color);
          color: var(--background-color);
        }
      `}
  `,
};

export const Breadcrumbs: FC<BreadcrumbsProps> = memo(({ items }) => (
  <Styled.Wrapper separator="›">
    {items.map(({ title, path }, index) => (
      <Styled.Link to={path} key={path} last={index === items.length - 1}>
        {title}
      </Styled.Link>
    ))}
  </Styled.Wrapper>
));
