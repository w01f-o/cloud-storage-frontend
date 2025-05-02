'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import { FC } from 'react';
import { rootVariants } from './progress.variants';

interface ProgressProps extends Omit<ProgressPrimitive.ProgressProps, 'value'> {
  dir?: 'ltr' | 'rtl';
  color?: string;
  value: number;
}

export const Progress: FC<ProgressProps> = ({
  className,
  value,
  dir,
  ...props
}) => {
  return (
    <ProgressPrimitive.Root className={rootVariants({ className })} {...props}>
      <ProgressPrimitive.Indicator
        className='bg-primary h-full w-full flex-1 rounded-2xl transition-all'
        style={{
          transform:
            dir === 'rtl'
              ? `translateX(${100 - Math.max(value, 1.5)}%)`
              : `translateX(-${100 - Math.max(value, 1.5)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
};
