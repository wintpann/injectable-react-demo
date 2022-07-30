import { RefObject, useCallback, useLayoutEffect, useState } from 'react';
import { ResizeCallback, useResizeObserver } from '@hooks/use-resize-observer.hook';

export type Bounds = Omit<DOMRectReadOnly, 'toJSON'>;

const initialBounds: Bounds = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
};

export const useBounds = (ref: RefObject<HTMLElement>): Bounds => {
  const [bounds, setBounds] = useState<Bounds>(initialBounds);
  const handleResize: ResizeCallback = useCallback((entry) => {
    setBounds(entry.contentRect);
  }, []);
  useLayoutEffect(() => {
    if (ref.current) {
      setBounds(ref.current.getBoundingClientRect());
    }
  }, [ref]);
  useResizeObserver(handleResize, ref);
  return bounds;
};
