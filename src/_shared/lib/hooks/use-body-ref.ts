'use client';

import { RefObject, useEffect, useRef } from 'react';

export const useBodyRef = (): RefObject<HTMLBodyElement | null> => {
  const bodyRef = useRef<HTMLBodyElement>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      bodyRef.current = document.body as HTMLBodyElement;
    }
  }, []);

  return bodyRef;
};
