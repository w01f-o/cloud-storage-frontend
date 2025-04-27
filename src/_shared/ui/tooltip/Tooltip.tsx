import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { AnimatePresence, motion } from 'motion/react';
import {
  ComponentRef,
  createContext,
  FC,
  forwardRef,
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

export const TooltipContent = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipPrimitive.TooltipContentProps
>(({ children, className, ...props }, ref) => {
  const { isOpen } = useContext(TooltipContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <TooltipPrimitive.Portal forceMount>
          <TooltipPrimitive.Content
            className={tooltipVariants({ className })}
            ref={ref}
            {...props}
            forceMount
            asChild
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 5 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      )}
    </AnimatePresence>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
