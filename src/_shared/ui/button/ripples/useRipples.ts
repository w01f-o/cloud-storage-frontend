import { MouseEvent, useCallback, useLayoutEffect, useState } from 'react';

type RippleItem = {
  x: number;
  y: number;
  size: number;
};

export const useRipples = (duration: number = 700) => {
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  useLayoutEffect(() => {
    if (!ripples.length) return;

    const timeoutId = setTimeout(() => {
      setRipples([]);
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [duration, ripples]);

  const addRipple = useCallback((event: MouseEvent) => {
    const { width, height, x, y } = event.currentTarget.getBoundingClientRect();

    const size = Math.max(width, height);

    const rippleX = event.pageX - x - size / 2;
    const rippleY = event.pageY - y - size / 2;

    setRipples(prev => [...prev, { x: rippleX, y: rippleY, size }]);
  }, []);

  return { ripples, addRipple };
};
