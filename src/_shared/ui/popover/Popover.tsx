'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { AnimatePresence, motion } from 'motion/react';
import {
  createContext,
  Ref,
  RefObject,
  useContext,
  useState,
  type FC,
} from 'react';
import { contentVariants } from './popover.variants';

interface PopoverContextValue {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const PopoverContext = createContext<PopoverContextValue>(
  {} as PopoverContextValue
);

export const Popover: FC<PopoverPrimitive.PopoverProps> = ({
  children,
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  ...props
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(
    defaultOpen ?? false
  );
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const setIsOpen = onOpenChange ?? setUncontrolledOpen;

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      <PopoverPrimitive.Root
        open={controlledOpen}
        defaultOpen={defaultOpen}
        onOpenChange={setIsOpen}
        {...props}
      >
        {children}
      </PopoverPrimitive.Root>
    </PopoverContext.Provider>
  );
};

export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;

interface PopoverContentProps extends PopoverPrimitive.PopoverContentProps {
  portalContainer?: RefObject<HTMLDivElement | null>;
  ref?: Ref<HTMLDivElement>;
}

export const PopoverContent: FC<PopoverContentProps> = ({
  className,
  align = 'center',
  sideOffset = 4,
  children,
  ref,
  portalContainer,
  ...props
}) => {
  const { isOpen } = useContext(PopoverContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <PopoverPrimitive.Portal
          forceMount
          container={portalContainer?.current}
        >
          <PopoverPrimitive.Content
            align={align}
            sideOffset={sideOffset}
            forceMount
            asChild
            ref={ref}
            {...props}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.12 }}
              className={contentVariants(className)}
            >
              {children}
            </motion.div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      )}
    </AnimatePresence>
  );
};
