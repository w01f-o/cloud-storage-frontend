import { tv } from 'tailwind-variants';

export const avatarVariants = tv({
  base: 'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full text-foreground',
  variants: {
    size: {
      xs: 'size-12',
      sm: 'size-24',
      md: 'size-32',
      lg: 'size-52',
      xl: 'size-64',
    },
  },
  defaultVariants: {
    size: 'xs',
  },
});
