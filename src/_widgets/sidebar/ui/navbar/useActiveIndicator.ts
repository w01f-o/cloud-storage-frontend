import { useBodyRef } from '@/_shared/lib';
import { RouterConfig } from '@/_shared/router';
import { Ref, RefObject, useRef, useState } from 'react';
import {
  useDebounceCallback,
  useIsomorphicLayoutEffect,
  useResizeObserver,
} from 'usehooks-ts';

interface UseActiveIndicatorParams {
  pathname: string;
}

interface ActiveIndicatorStyles {
  top: number;
  height: number;
}

const ACTIVE_INDICATOR_HEIGHT = 32;

interface UseActiveIndicatorReturn {
  activeElementRef: Ref<HTMLLIElement>;
  activeIndicatorStyles: ActiveIndicatorStyles | null;
  isDisableAnimation: boolean;
}

export const useActiveIndicator = ({
  pathname,
}: UseActiveIndicatorParams): UseActiveIndicatorReturn => {
  const [activeIndicatorStyles, setActiveIndicatorStyles] =
    useState<ActiveIndicatorStyles | null>(null);
  const [isDisableAnimation, setIsDisableAnimation] = useState(false);

  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const bodyRef = useBodyRef();
  const activeElementRef = useRef<HTMLLIElement>(null);

  const updateIndicatorPosition = useDebounceCallback(() => {
    if (
      RouterConfig.getNavBarRoutes().every(route => route.path !== pathname)
    ) {
      return setActiveIndicatorStyles(null);
    }

    const element = activeElementRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();

    setActiveIndicatorStyles({
      top: rect.top + (rect.height - ACTIVE_INDICATOR_HEIGHT) / 2,
      height: ACTIVE_INDICATOR_HEIGHT,
    });
  }, 100);

  const disableAnimationTemporarily = () => {
    setIsDisableAnimation(true);

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      setIsDisableAnimation(false);
    }, 200);
  };

  useResizeObserver({
    ref: bodyRef as RefObject<HTMLElement>,
    onResize: () => {
      updateIndicatorPosition();
      disableAnimationTemporarily();
    },
  });

  useIsomorphicLayoutEffect(() => {
    updateIndicatorPosition();
  }, [pathname]);

  return {
    activeIndicatorStyles,
    activeElementRef,
    isDisableAnimation,
  };
};
