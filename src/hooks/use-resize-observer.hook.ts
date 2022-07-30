import { RefObject, useEffect, useRef } from 'react';
import noop from 'lodash/noop';

export type ResizeCallback = (entry: ResizeObserverEntry) => void;

export const useResizeObserver = (callback: ResizeCallback, ref: RefObject<HTMLElement>): void => {
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return noop;
    }

    observerRef.current = new ResizeObserver((entries) => callback(entries[0]));
    observerRef.current.observe(ref.current);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [callback, ref]);
};
