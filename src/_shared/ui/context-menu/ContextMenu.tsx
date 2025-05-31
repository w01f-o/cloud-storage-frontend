'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import {
  IconCheck,
  IconChevronRight,
  IconPointFilled,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ComponentPropsWithRef,
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {
  checkboxItemVariants,
  contentVariants,
  itemVariants,
  labelVariants,
  radioItemVariants,
  separatorVariants,
  subTriggerVariants,
} from './context-menu.variants';

interface ContextMenuContextValue {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ContextMenuContext = createContext<ContextMenuContextValue>(
  {} as ContextMenuContextValue
);

const ContextSubMenuContext = createContext<ContextMenuContextValue>(
  {} as ContextMenuContextValue
);

export const ContextMenu: FC<ContextMenuPrimitive.ContextMenuProps> = ({
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ContextMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <ContextMenuPrimitive.Root {...props} onOpenChange={setIsOpen}>
        {children}
      </ContextMenuPrimitive.Root>
    </ContextMenuContext.Provider>
  );
};

export const ContextMenuSub: FC<ContextMenuPrimitive.ContextMenuSubProps> = ({
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ContextSubMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <ContextMenuPrimitive.Sub {...props} onOpenChange={setIsOpen}>
        {children}
      </ContextMenuPrimitive.Sub>
    </ContextSubMenuContext.Provider>
  );
};

export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

export const ContextMenuSubTrigger: FC<
  ComponentPropsWithRef<typeof ContextMenuPrimitive.SubTrigger>
> = ({ className, children, ref, ...props }) => {
  return (
    <ContextMenuPrimitive.SubTrigger
      className={subTriggerVariants({ className })}
      ref={ref}
      {...props}
    >
      {children}
      <IconChevronRight className='ml-auto h-4 w-4' />
    </ContextMenuPrimitive.SubTrigger>
  );
};

export const ContextMenuSubContent: FC<
  ComponentPropsWithRef<typeof ContextMenuPrimitive.SubContent>
> = ({ children, className, ref, ...props }) => {
  const { isOpen } = useContext(ContextSubMenuContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <ContextMenuPrimitive.SubContent ref={ref} {...props} forceMount>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className={contentVariants({ className })}
          >
            {children}
          </motion.div>
        </ContextMenuPrimitive.SubContent>
      )}
    </AnimatePresence>
  );
};

export const ContextMenuContent: FC<
  ComponentPropsWithRef<typeof ContextMenuPrimitive.Content>
> = ({ className, children, ref, ...props }) => {
  const { isOpen } = useContext(ContextMenuContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <ContextMenuPrimitive.Portal forceMount>
          <ContextMenuPrimitive.Content ref={ref} {...props} forceMount>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.12 }}
              className={contentVariants({ className })}
            >
              {children}
            </motion.div>
          </ContextMenuPrimitive.Content>
        </ContextMenuPrimitive.Portal>
      )}
    </AnimatePresence>
  );
};

interface ContextMenuItemProps
  extends ComponentPropsWithRef<typeof ContextMenuPrimitive.Item> {
  isDanger?: boolean;
}

export const ContextMenuItem: FC<ContextMenuItemProps> = ({
  className,
  isDanger,
  ref,
  children,
  ...props
}) => {
  return (
    <ContextMenuPrimitive.Item
      className={itemVariants({ className, isDanger })}
      ref={ref}
      {...props}
    >
      {children}
    </ContextMenuPrimitive.Item>
  );
};

interface ContextMeuCheckboxItemProps
  extends ComponentPropsWithRef<typeof ContextMenuPrimitive.CheckboxItem> {
  isDanger?: boolean;
}

export const ContextMenuCheckboxItem: FC<ContextMeuCheckboxItemProps> = ({
  className,
  children,
  checked,
  ref,
  isDanger,
  ...props
}) => {
  return (
    <ContextMenuPrimitive.CheckboxItem
      className={checkboxItemVariants({ className, isDanger })}
      checked={checked}
      ref={ref}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <ContextMenuPrimitive.ItemIndicator>
          <IconCheck className='h-4 w-4' />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
};

interface ContextMenuRadioItemProps
  extends ComponentPropsWithRef<typeof ContextMenuPrimitive.RadioItem> {
  isDanger?: boolean;
}

export const ContextMenuRadioItem: FC<ContextMenuRadioItemProps> = ({
  className,
  children,
  isDanger,
  ref,
  ...props
}) => {
  return (
    <ContextMenuPrimitive.RadioItem
      className={radioItemVariants({ className, isDanger })}
      ref={ref}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <ContextMenuPrimitive.ItemIndicator>
          <IconPointFilled className='h-4 w-4 fill-current' />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
};

export const ContextMenuLabel: FC<
  ComponentPropsWithRef<typeof ContextMenuPrimitive.Label>
> = ({ className, ref, children, ...props }) => {
  return (
    <ContextMenuPrimitive.Label
      className={labelVariants({ className })}
      ref={ref}
      {...props}
    >
      {children}
    </ContextMenuPrimitive.Label>
  );
};

export const ContextMenuSeparator: FC<
  ComponentPropsWithRef<typeof ContextMenuPrimitive.Separator>
> = ({ className, ref, children, ...props }) => {
  return (
    <ContextMenuPrimitive.Separator
      className={separatorVariants({ className })}
      ref={ref}
      {...props}
    >
      {children}
    </ContextMenuPrimitive.Separator>
  );
};
