import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { IconChevronUp } from '@tabler/icons-react';
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react';
import { tv } from 'tailwind-variants';

export const Accordion = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      className={tv({
        base: 'text-foreground w-full',
      })({
        className,
      })}
      {...props}
    />
  );
});
Accordion.displayName = AccordionPrimitive.Root.displayName;

export const AccordionItem = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Item
      className={tv({ base: 'border-foreground/20 border-b last:border-none' })(
        {
          className,
        }
      )}
      ref={ref}
      {...props}
    />
  );
});
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

export const AccordionTrigger = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Header className='w-full'>
      <AccordionPrimitive.Trigger
        className={tv({
          base: 'hover:bg-background/80 flex w-full items-center justify-between px-4 py-3 text-left font-medium transition-all [&[data-state=open]>svg]:rotate-360',
        })({ className })}
        ref={ref}
        {...props}
      >
        {children}
        <IconChevronUp className='size-4 rotate-180 transition-transform duration-300' />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export const AccordionContent = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      className={tv({
        base: 'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden',
      })({ className })}
      ref={ref}
      {...props}
    >
      <div className='px-4 py-2'>{children}</div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
