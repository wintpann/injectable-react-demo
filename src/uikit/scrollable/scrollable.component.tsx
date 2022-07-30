import React, { FC, memo, ReactNode, useRef } from 'react';
import { styled } from '@mui/material';
import { useBounds } from '@hooks/use-bounds.hook';

type ScrollableProps = {
  header: ReactNode;
  content: ReactNode;
};

const Styled = {
  Wrapper: styled('div')`
    width: 100%;
    height: 100%;
  `,
  Header: styled('div')`
    width: 100%;
  `,
  Content: styled('div')<{ headerHeight: number }>`
    width: 100%;
    height: calc(100% - ${({ headerHeight }) => headerHeight}px);
    overflow: auto;
  `,
};

export const Scrollable: FC<ScrollableProps> = memo(({ header, content }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { height: headerHeight } = useBounds(headerRef);

  return (
    <Styled.Wrapper>
      <Styled.Header ref={headerRef}>{header}</Styled.Header>
      <Styled.Content headerHeight={headerHeight}>{content}</Styled.Content>
    </Styled.Wrapper>
  );
});
