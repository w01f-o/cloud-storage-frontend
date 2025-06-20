'use client';

import * as SelectPrimitive from '@radix-ui/react-select';

import { IconCheck, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import { ComponentPropsWithRef, FC, ReactNode } from 'react';
import {
  contentVariants,
  itemVariants,
  labelVariants,
  scrollDownButtonVariants,
  scrollUpButtonVariants,
  separatorVariants,
  triggerVariants,
  viewportVariants,
} from './select.variants';

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger: FC<
  ComponentPropsWithRef<typeof SelectPrimitive.Trigger>
> = ({ className, children, ref, ...props }) => {
  return (
    <SelectPrimitive.Trigger
      className={triggerVariants({ className })}
      ref={ref}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <IconChevronDown className='h-4 w-4 opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

export const SelectScrollUpButton: FC<
  ComponentPropsWithRef<typeof SelectPrimitive.ScrollUpButton>
> = ({ className, ref, ...props }) => {
  return (
    <SelectPrimitive.ScrollUpButton
      className={scrollUpButtonVariants({ className })}
      ref={ref}
      {...props}
    >
      <IconChevronUp className='h-4 w-4' />
    </SelectPrimitive.ScrollUpButton>
  );
};

export const SelectScrollDownButton: FC<
  ComponentPropsWithRef<typeof SelectPrimitive.ScrollDownButton>
> = ({ className, ref, ...props }) => (
  <SelectPrimitive.ScrollDownButton
    className={scrollDownButtonVariants({ className })}
    ref={ref}
    {...props}
  >
    <IconChevronDown className='h-4 w-4' />
  </SelectPrimitive.ScrollDownButton>
);

export const SelectContent: FC<
  ComponentPropsWithRef<typeof SelectPrimitive.Content>
> = ({ className, children, ref, position = 'popper', ...props }) => {
  return (
    <AnimatePresence>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content position={position} {...props} asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            ref={ref}
            className={contentVariants({ className, position })}
          >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
              className={viewportVariants({ className, position })}
            >
              {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
          </motion.div>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </AnimatePresence>
  );
};

export const SelectLabel: FC<SelectPrimitive.SelectLabelProps> = ({
  className,
  ...props
}) => {
  return (
    <SelectPrimitive.Label
      className={labelVariants({
        className,
      })}
      {...props}
    />
  );
};

interface SelectItemProps extends SelectPrimitive.SelectItemProps {
  icon?: ReactNode;
}

export const SelectItem: FC<SelectItemProps> = ({
  className,
  children,
  icon,
  ...props
}) => {
  return (
    <SelectPrimitive.Item className={itemVariants({ className })} {...props}>
      <span className='absolute right-2 flex h-3.5 w-3.5 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <IconCheck className='h-4 w-4' />
        </SelectPrimitive.ItemIndicator>
      </span>
      {icon}
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

export const SelectSeparator: FC<SelectPrimitive.SelectSeparatorProps> = ({
  className,
  ...props
}) => (
  <SelectPrimitive.Separator
    className={separatorVariants({ className })}
    {...props}
  />
);
