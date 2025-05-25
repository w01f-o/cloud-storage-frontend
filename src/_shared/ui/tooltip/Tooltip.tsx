'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { AnimatePresence, motion } from 'motion/react';
import {
  ComponentPropsWithRef,
  createContext,
  FC,
  useContext,
  useState,
} from 'react';
import { tooltipVariants } from './tooltip.variants';
import type { TooltipContext } from './types/tooltip.type';

const TooltipContext = createContext<TooltipContext>({} as TooltipContext);

export const Tooltip: FC<TooltipPrimitive.TooltipProps> = ({
  children,
  open,
  onOpenChange,
  defaultOpen = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const handleOpenChange = onOpenChange ?? setIsOpen;

  return (
    <TooltipContext.Provider
      value={{
        isOpen: open ?? isOpen,
        setIsOpen: handleOpenChange,
      }}
    >
      <TooltipPrimitive.Provider {...props}>
        <TooltipPrimitive.Root
          open={open ?? isOpen}
          onOpenChange={handleOpenChange}
          {...props}
        >
          {children}
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    </TooltipContext.Provider>
  );
};

export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent: FC<
  ComponentPropsWithRef<typeof TooltipPrimitive.Content>
> = ({ children, className, ref, ...props }) => {
  const { isOpen } = useContext(TooltipContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <TooltipPrimitive.Portal forceMount>
          <TooltipPrimitive.Content
            className='!z-[60]'
            ref={ref}
            {...props}
            forceMount
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: -5 }}
              exit={{ opacity: 0, scale: 0.95, y: 5 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className={tooltipVariants({ className })}
            >
              {children}
            </motion.div>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      )}
    </AnimatePresence>
  );
};
