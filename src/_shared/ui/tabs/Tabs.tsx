'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { ComponentPropsWithRef, FC } from 'react';
import {
  contentVariants,
  listVariants,
  triggerVariants,
} from './tabs.variants';

export const Tabs = TabsPrimitive.Root;

export const TabsList: FC<ComponentPropsWithRef<typeof TabsPrimitive.List>> = ({
  className,
  ref,
  children,
  ...props
}) => {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={listVariants({ className })}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  );
};

export const TabsTrigger: FC<
  ComponentPropsWithRef<typeof TabsPrimitive.Trigger>
> = ({ className, children, ref, ...props }) => {
  return (
    <TabsPrimitive.Trigger
      className={triggerVariants({ className })}
      ref={ref}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
};

export const TabsContent: FC<
  ComponentPropsWithRef<typeof TabsPrimitive.Content>
> = ({ className, ref, children, ...props }) => {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={contentVariants({ className })}
      {...props}
    >
      {children}
    </TabsPrimitive.Content>
  );
};
