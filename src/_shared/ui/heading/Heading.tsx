import {
  ComponentPropsWithoutRef,
  ElementType,
  FC,
  HTMLAttributes,
  ReactNode,
} from 'react';
import { headingVariants } from './heading.variants';

type HeadingElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps<T extends ElementType = HeadingElements>
  extends HTMLAttributes<T> {
  children?: ReactNode;
  as?: T;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'default';
}

export const Heading = <T extends ElementType = HeadingElements>({
  as,
  className,
  children,
  size,
  ...props
}: HeadingProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof HeadingProps<T>>): ReturnType<FC> => {
  const Tag = as || 'h1';

  return (
    <Tag className={headingVariants({ size, className })} {...props}>
      {children}
    </Tag>
  );
};
