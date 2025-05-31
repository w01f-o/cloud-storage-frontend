'use client';

import { Root as Slot, Slottable } from '@radix-ui/react-slot';
import { motion, MotionProps } from 'motion/react';
import { ButtonHTMLAttributes, FC, ReactNode, useMemo } from 'react';
import { Spinner } from '../spinner';
import { buttonVariants } from './button-variants';
import { Ripples } from './ripples';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
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
  asChild?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
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
  asChild,
  ...props
}) => {
  const Comp = useMemo(
    () => motion.create(asChild ? Slot : 'button'),
    [asChild]
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
    <Comp
      className={buttonVariants({
        className,
        variant,
        color,
        size,
        radius,
        isIconOnly,
        isFullWidth,
        isLoading,
        isDisabled,
      })}
      {...animationProps}
      {...props}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      disabled={isDisabled || isLoading}
      aria-disabled={isDisabled || isLoading}
    >
      {spinnerPosition === 'start' && isLoading && <Spinner />}
      {startContent}
      <Slottable>{children}</Slottable>
      {endContent}
      {spinnerPosition === 'end' && isLoading && <Spinner />}
      {!isRipplesDisabled && <Ripples />}
    </Comp>
  );
};
