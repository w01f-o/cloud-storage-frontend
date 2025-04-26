import { tv } from 'tailwind-variants';

export const modalOverlayVariants = tv({
  base: 'fixed inset-0 bg-content/50 z-50',
  variants: {
    backdrop: {
      blurred: 'backdrop-blur-xs',
      opaque: 'bg-content/50',
      transparent: 'bg-transparent',
    },
  },
  defaultVariants: {
    backdrop: 'opaque',
  },
});

export const modalContentVariants = tv({
  base: [
    'flex',
    'flex-col',
    'gap-2',
    'bg-background',
    'text-foreground',
    'px-7',
    'py-6',
    'w-full',
    'mx-4',
    'shadow-small',
    'z-50',
    'pointer-events-auto',
    'relative',
  ],
  variants: {
    size: {
      auto: 'sm:w-auto',
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
    overflowScroll: {
      inside: 'max-h-[calc(100vh-8rem)] my-16',
      outside: 'my-16',
    },
  },
  defaultVariants: {
    rounded: 'md',
    size: 'md',
    overflowScroll: 'inside',
  },
});

export const modalBodyVariants = tv({
  variants: {
    overflowScroll: {
      inside: 'overflow-y-auto',
      outside: '',
    },
  },
  defaultVariants: {
    overflowScroll: 'inside',
  },
});
