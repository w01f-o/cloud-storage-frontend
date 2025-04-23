import { tv } from 'tailwind-variants';

export const captionVariants = tv({
  variants: {
    size: {
      xs: 'text-[0.625rem]',
      sm: 'text-xs',
      md: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});
