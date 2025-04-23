import { tv } from 'tailwind-variants';

export const headingVariants = tv({
  base: 'font-bold',
  variants: {
    size: {
      default: 'text-[1.125rem]',
      sm: 'text-[1.375rem] font-semibold',
      md: 'text-[1.625rem] font-semibold',
      lg: 'text-3xl',
      xl: 'text-4xl',
      '2xl': 'text-[4rem]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
