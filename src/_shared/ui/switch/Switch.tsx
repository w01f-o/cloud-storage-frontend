'use client';

import * as SwitchPrimitives from '@radix-ui/react-switch';
import { FC, Ref } from 'react';
import { switchVariants, thumbVariants } from './switch.variants';

interface SwitchProps extends SwitchPrimitives.SwitchProps {
  ref: Ref<HTMLButtonElement>;
}

const Switch: FC<SwitchProps> = ({ className, ref, ...props }) => (
  <SwitchPrimitives.Root
    className={switchVariants(className)}
    ref={ref}
    {...props}
  >
    <SwitchPrimitives.Thumb className={thumbVariants()} />
  </SwitchPrimitives.Root>
);

export { Switch };
