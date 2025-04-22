import {
  ComponentPropsWithoutRef,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from 'react';
import { tv } from 'tailwind-variants';

interface TextProps<T extends ElementType = 'p'> extends HTMLAttributes<T> {
  children: ReactNode;
  as?: T;
  size?: 'xs' | 'sm' | 'base' | 'lg';
}

const twVariant = tv({
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'base',
  },
});

export const Text = <T extends ElementType = 'p'>({
  children,
  as,
  size = 'base',
  className,
  ...props
}: TextProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextProps<T>>) => {
  const Tag = as || 'p';

  return (
    <Tag className={twVariant({ size, className })} {...props}>
      {children}
    </Tag>
  );
};
