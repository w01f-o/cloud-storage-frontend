import clsx from 'clsx';
import { FC } from 'react';
import { useRipples } from './useRipples';

interface RippleProps {
  duration?: number;
  className?: string;
}

export const Ripples: FC<RippleProps> = ({ duration, className }) => {
  const { addRipple, ripples } = useRipples(duration);

  return (
    <div
      onMouseDown={addRipple}
      className='pointer-none absolute inset-0 select-none'
    >
      {ripples.map((ripple, index) => {
        return (
          <span
            key={index}
            className={clsx(
              'animate-ripple absolute transform-[scale(0)] rounded-full bg-current/20 opacity-70 duration-700',
              className
            )}
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
              animationDuration: `${duration}ms`,
            }}
          />
        );
      })}
    </div>
  );
};
