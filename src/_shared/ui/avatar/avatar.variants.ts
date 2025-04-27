import { tv } from 'tailwind-variants';

const avatarVariants = tv({
  base: 'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full text-foreground',
  variants: {
    size: {
      default: 'size-12',
      large: 'size-64',
    },
  },
});

export { avatarVariants };
