import { tv } from 'tailwind-variants';

export const wrapperVariants = tv({
  base: 'flex flex-col w-full',
  variants: {
    isFullWidth: {
      false: 'max-w-sm',
    },
  },
});

export const inputWrapperVariants = tv({
  base: 'flex items-end relative cursor-text size-full border-2 bg-background border-primary transition-colors-background-opacity outline-focus-base focus-visible:outline-primary rounded-lg py-2.5 px-4',
  variants: {
    isInvalid: {
      true: 'border-danger text-danger',
    },
    size: {
      sm: 'h-12',
      md: 'h-14',
      lg: 'h-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const labelVariants = tv({
  base: [
    'absolute',
    'text-sm',
    'left-4',
    'transform',
    'duration-300',
    '-translate-y-1',
    'scale-80',
    'top-2',
    'z-10',
    'origin-left',
    'peer-placeholder-shown:scale-100',
    'peer-placeholder-shown:-translate-y-1/2',
    'peer-placeholder-shown:top-1/2',
    'peer-focus-visible:top-2',
    'peer-focus-visible:scale-80',
    'peer-focus-visible:-translate-y-1',
    'pointer-events-none',
  ],
});

export const inputVariants = tv({
  base: 'w-full text-small outline-none peer cursor-text bg-transparent',
});
