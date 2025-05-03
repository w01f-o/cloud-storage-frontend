'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { FC } from 'react';
import {
  contentVariants,
  listVariants,
  triggerVariants,
} from './tabs.variants';

export const Tabs = TabsPrimitive.Root;

export const TabsList: FC<TabsPrimitive.TabsListProps> = ({
  className,
  ...props
}) => {
  return (
    <TabsPrimitive.List className={listVariants({ className })} {...props} />
  );
};

export const TabsTrigger: FC<TabsPrimitive.TabsTriggerProps> = ({
  className,
  ...props
}) => {
  return (
    <TabsPrimitive.Trigger
      className={triggerVariants({ className })}
      {...props}
    />
  );
};

export const TabsContent: FC<TabsPrimitive.TabsContentProps> = ({
  className,
  ...props
}) => {
  return (
    <TabsPrimitive.Content
      className={contentVariants({ className })}
      {...props}
    />
  );
};
