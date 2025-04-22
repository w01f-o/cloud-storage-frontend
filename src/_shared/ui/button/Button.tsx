'use client';

import { motion, MotionProps } from 'motion/react';
import {
  ComponentPropsWithoutRef,
  ElementType,
  FC,
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  useMemo,
} from 'react';
import { Spinner } from '../spinner';
import { Text } from '../text';
import { buttonVariants } from './button-variants';
import { Ripples } from './Ripples';

interface ButtonProps<T extends ElementType = 'button'>
  extends HTMLAttributes<T> {
  children?: ReactNode;
  as?: T;
  variant?: 'solid' | 'bordered' | 'ghost';
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'default';
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  startContent?: ReactNode;
  endContent?: ReactNode;
  isFullWidth?: boolean;
  isIconOnly?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  spinnerPosition?: 'start' | 'end';
  disableRipple?: boolean;
  disableAnimation?: boolean;
  customMotionProps?: MotionProps;
}

const Button = <T extends ElementType = 'button'>({
  children,
  as,
  className,
  color,
  endContent = null,
  startContent = null,
  radius,
  size,
  isIconOnly,
  disableAnimation,
  disableRipple,
  isDisabled,
  isLoading,
  spinnerPosition = 'start',
  isFullWidth,
  customMotionProps,
  variant,
  ...props
}: ButtonProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>): ReturnType<FC> => {
  const Tag = useMemo(
    () =>
      motion.create(as ?? 'button') as ForwardRefExoticComponent<
        MotionProps & HTMLAttributes<T>
      >,
    [as]
  );

  const animationProps: MotionProps = disableAnimation
    ? {}
    : {
        whileTap: {
          scale: 0.95,
          transition: { duration: 0.01 },
        },
        ...customMotionProps,
      };

  const isRipplesDisabled = disableRipple || variant === 'bordered';

  return (
    <Tag
      className={buttonVariants({
        className,
        variant,
        color,
        size,
        radius,
        isIconOnly,
        isFullWidth,
        isLoading,
      })}
      {...animationProps}
      {...props}
      disabled={isDisabled || isLoading}
      aria-disabled={isDisabled || isLoading}
    >
      {spinnerPosition === 'start' && isLoading && <Spinner size={size} />}
      {startContent}
      {isIconOnly ? (
        children
      ) : (
        <Text as='span' size={size === 'lg' ? 'lg' : undefined}>
          {children}
        </Text>
      )}
      {endContent}
      {spinnerPosition === 'end' && isLoading && <Spinner size={size} />}
      {!isRipplesDisabled && <Ripples />}
    </Tag>
  );
};

export { Button };
