import { tv } from 'tailwind-variants';

const colors = [
  'primary',
  'secondary',
  'danger',
  'success',
  'default',
] as const;

const solidColors = {
  default: 'bg-default text-background dark:text-foreground',
  primary: 'bg-primary text-background dark:text-foreground',
  secondary: 'bg-secondary text-primary',
  danger: 'bg-danger text-background dark:text-foreground',
  success: 'bg-success text-background dark:text-foreground',
};

const borderedColors = {
  default: 'border-default text-default',
  primary: 'border-primary text-primary',
  secondary: 'border-secondary text-secondary',
  danger: 'border-danger text-danger',
  success: 'border-success text-success',
};

const ghostColors = {
  default: 'hover:bg-default/10',
  primary: 'hover:bg-primary/20',
  secondary: 'hover:bg-secondary/70',
  danger: 'hover:bg-danger/20',
  success: 'hover:bg-success/20',
};

export const buttonVariants = tv({
  base: [
    'inline-flex',
    'justify-center',
    'items-center',
    'relative',
    'overflow-hidden',
    'gap-2',
    'font-semibold',
    'select-none',
    'outline-focus-base',
    'focus-visible:outline-primary',
    'transition-colors-background-opacity',
    'disabled:pointer-events-none',
    'disabled:opacity-70',
  ],
  variants: {
    color: {
      default: '',
      primary: '',
      secondary: '',
      danger: '',
      success: '',
    },
    variant: {
      solid: 'hover:opacity-base',
      bordered: 'border-2 bg-transparent',
      ghost: 'bg-transparent',
    },
    size: {
      sm: 'h-8 min-w-24 px-3 text-sm',
      md: 'h-10 min-w-28 px-4 text-md',
      lg: 'h-12 min-w-32 px-6 text-lg',
    },
    isIconOnly: {
      true: 'px-0 min-w-0',
    },
    isFullWidth: {
      true: 'w-full',
    },
    isLoading: {
      true: '',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
  },
  compoundVariants: [
    ...colors.map(color => ({
      variant: 'bordered' as const,
      color: color,
      className: borderedColors[color],
    })),
    ...colors.map(color => ({
      variant: 'ghost' as const,
      color: color,
      className: ghostColors[color],
    })),
    ...colors.map(color => ({
      variant: 'solid' as const,
      color: color,
      className: solidColors[color],
    })),
    {
      isIconOnly: true,
      size: 'sm',
      className: 'size-10',
    },
    {
      isIconOnly: true,
      size: 'md',
      className: 'size-12',
    },
    {
      isIconOnly: true,
      size: 'lg',
      className: 'size-14',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    radius: 'md',
  },
});
