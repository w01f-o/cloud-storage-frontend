import { tv } from 'tailwind-variants';

export const skeletonVariants = tv({
  base: [
    'absolute',
    'inset-0',
    'bg-skeleton',
    'overflow-hidden',
    'before:absolute',
    'before:bg-gradient-to-r',
    'before:from-transparent',
    'before:via-skeleton-highlight',
    'before:to-transparent',
    'before:inset-0',
    'before:-translate-x-full',
    'before:animate-shimmer',
    'before:animate-pulse',
  ],
});

export const skeletonWrapperVariants = tv({
  base: 'relative inline-flex size-full',
});
