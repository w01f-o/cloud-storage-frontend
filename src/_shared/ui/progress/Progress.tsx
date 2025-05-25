'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import { FC, Ref } from 'react';
import { rootVariants } from './progress.variants';

interface ProgressProps extends Omit<ProgressPrimitive.ProgressProps, 'value'> {
  dir?: 'ltr' | 'rtl';
  color?: string;
  value: number;
  ref?: Ref<HTMLDivElement>;
}

export const Progress: FC<ProgressProps> = ({
  className,
  value,
  color,
  dir,
  ref,
  ...props
}) => {
  return (
    <ProgressPrimitive.Root
      className={rootVariants({ className })}
      ref={ref}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className='bg-primary h-full w-full flex-1 rounded-2xl transition-all'
        style={{
          transform:
            dir === 'rtl'
              ? `translateX(${100 - Math.max(value, 1.5)}%)`
              : `translateX(-${100 - Math.max(value, 1.5)}%)`,
          background: color,
        }}
      />
    </ProgressPrimitive.Root>
  );
};
