import { tv } from 'tailwind-variants';

export const wrapperVariants = tv({
  base: 'flex flex-col',
  variants: {
    isFullWidth: {
      false: 'min-w-60 max-w-sm',
      true: 'w-full',
    },
  },
});

export const inputWrapperVariants = tv({
  base: 'flex gap-2 relative cursor-text size-full border-2 bg-background transition-colors-background-opacity outline-focus-base focus-visible:outline-primary rounded-lg px-4',
  variants: {
    isInvalid: {
      true: 'border-danger text-danger',
    },
    size: {
      sm: 'h-12 pt-1.5 pb-1.5',
      md: 'h-14 py-2.5',
      lg: 'h-16 py-2.5',
    },
    withLabel: {
      true: 'items-end',
      false: 'items-center',
    },
    color: {
      primary: '',
      secondary: '',
      danger: '',
      success: '',
      default: '',
    },
  },
  compoundVariants: [
    { color: 'primary', isInvalid: false, className: 'border-primary' },
    { color: 'secondary', isInvalid: false, className: 'border-secondary' },
    { color: 'danger', isInvalid: false, className: 'border-danger' },
    { color: 'success', isInvalid: false, className: 'border-success' },
    { color: 'default', isInvalid: false, className: 'border-default' },
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
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
