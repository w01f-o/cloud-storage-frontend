import { tv } from 'tailwind-variants';

export const imageVariants = tv({
  base: 'transition',
  variants: {
    isVisible: {
      true: 'opacity-100',
      false: 'opacity-0',
    },
  },
});

export const imageWrapperVariants = tv({
  base: 'inline-flex overflow-hidden',
});
