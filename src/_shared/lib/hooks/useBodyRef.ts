'use client';

import { useEffect, useRef } from 'react';

export const useBodyRef = () => {
  const bodyRef = useRef<HTMLBodyElement>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      bodyRef.current = document.body as HTMLBodyElement;
    }
  }, []);

  return bodyRef;
};
