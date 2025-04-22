import { useEffect, useRef, useState } from 'react';

interface UseActiveIndicatorParams {
  pathname: string;
}

interface ActiveIndicatorStyles {
  top: number;
  height: number;
}

const ACTIVE_INDICATOR_HEIGHT: number = 32;

export const useActiveIndicator = (params: UseActiveIndicatorParams) => {
  const { pathname } = params;

  const [activeIndicatorStyles, setActiveIndicatorStyles] =
    useState<ActiveIndicatorStyles | null>(null);

  const activeElementRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const activeElement = activeElementRef.current;

    if (!activeElement) {
      return;
    }

    const clientRect = activeElement.getBoundingClientRect();

    setActiveIndicatorStyles({
      top: clientRect.top + (clientRect.height - ACTIVE_INDICATOR_HEIGHT) / 2,
      height: ACTIVE_INDICATOR_HEIGHT,
    });
  }, [pathname]);

  return {
    activeIndicatorStyles,
    activeElementRef,
  };
};
