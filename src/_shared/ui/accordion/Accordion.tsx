import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { IconChevronUp } from '@tabler/icons-react';
import { ComponentPropsWithRef, FC } from 'react';
import {
  contentVariants,
  itemVariants,
  rootVariants,
  triggerVariants,
} from './accordion.variants';

export const Accordion: FC<
  ComponentPropsWithRef<typeof AccordionPrimitive.Root>
> = ({ className, children, ref, ...props }) => {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      className={rootVariants({
        className,
      })}
      {...props}
    >
      {children}
    </AccordionPrimitive.Root>
  );
};

export const AccordionItem: FC<
  ComponentPropsWithRef<typeof AccordionPrimitive.Item>
> = ({ className, children, ref, ...props }) => {
  return (
    <AccordionPrimitive.Item
      className={itemVariants({
        className,
      })}
      ref={ref}
      {...props}
    >
      {children}
    </AccordionPrimitive.Item>
  );
};

export const AccordionTrigger: FC<
  ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>
> = ({ children, className, ref, ...props }) => {
  return (
    <AccordionPrimitive.Header className='w-full'>
      <AccordionPrimitive.Trigger
        className={triggerVariants({ className })}
        ref={ref}
        {...props}
      >
        {children}
        <IconChevronUp className='size-4 rotate-180 transition-transform duration-300' />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};

export const AccordionContent: FC<
  ComponentPropsWithRef<typeof AccordionPrimitive.Content>
> = ({ children, className, ref, ...props }) => {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={contentVariants({ className })}
      {...props}
    >
      <div className='px-4 py-2'>{children}</div>
    </AccordionPrimitive.Content>
  );
};
