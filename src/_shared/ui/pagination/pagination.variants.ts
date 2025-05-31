import { tv } from 'tailwind-variants';

export const rootVariants = tv({ base: 'flex w-full justify-center' });

export const contentVariants = tv({
  base: 'flex flex-row items-center gap-2',
});

export const itemVariants = tv({
  base: 'transition-colors-background-opacity',
  variants: {
    isActive: {
      true: 'opacity-100',
      false: 'opacity-50',
    },
  },
});

export const prevNextVariants = tv({ base: '' });
