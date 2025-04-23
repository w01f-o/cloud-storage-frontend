import {
  ComponentPropsWithoutRef,
  ElementType,
  FC,
  HTMLAttributes,
  ReactNode,
} from 'react';
import { captionVariants } from './caption.variants';

interface CaptionProps<T extends ElementType = 'span'>
  extends HTMLAttributes<T> {
  children?: ReactNode;
  as?: T;
  size?: 'xs' | 'sm' | 'md';
}

const Caption = <T extends ElementType = 'span'>({
  children,
  size,
  className,
  as,
  ...props
}: CaptionProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CaptionProps<T>>): ReturnType<FC> => {
  const Tag = as || 'span';

  return (
    <Tag className={captionVariants({ size, className })} {...props}>
      {children}
    </Tag>
  );
};

export { Caption };
