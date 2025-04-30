'use client';

import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import {
  IconCheck,
  IconChevronRight,
  IconPointFilled,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import {
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
  ContextMenuPrimitive.ContextMenuSubTriggerProps
> = ({ className, children, ...props }) => {
  return (
    <ContextMenuPrimitive.SubTrigger
      className={subTriggerVariants({ className })}
      {...props}
    >
      {children}
      <IconChevronRight className='ml-auto h-4 w-4' />
    </ContextMenuPrimitive.SubTrigger>
  );
};

export const ContextMenuSubContent: FC<
  ContextMenuPrimitive.ContextMenuSubContentProps
> = ({ children, className, ...props }) => {
  const { isOpen } = useContext(ContextSubMenuContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <ContextMenuPrimitive.SubContent {...props} forceMount>
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
  ContextMenuPrimitive.ContextMenuContentProps
> = ({ className, children, ...props }) => {
  const { isOpen } = useContext(ContextMenuContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <ContextMenuPrimitive.Portal forceMount>
          <ContextMenuPrimitive.Content {...props} forceMount>
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
  extends ContextMenuPrimitive.ContextMenuItemProps {
  isDanger?: boolean;
}

export const ContextMenuItem: FC<ContextMenuItemProps> = ({
  className,
  isDanger,
  ...props
}) => {
  return (
    <ContextMenuPrimitive.Item
      className={itemVariants({ className, isDanger })}
      {...props}
    />
  );
};

interface ContextMeuCheckboxItemProps
  extends ContextMenuPrimitive.ContextMenuCheckboxItemProps {
  isDanger?: boolean;
}

export const ContextMenuCheckboxItem: FC<ContextMeuCheckboxItemProps> = ({
  className,
  children,
  checked,
  isDanger,
  ...props
}) => {
  return (
    <ContextMenuPrimitive.CheckboxItem
      className={checkboxItemVariants({ className, isDanger })}
      checked={checked}
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
  extends ContextMenuPrimitive.ContextMenuRadioItemProps {
  isDanger?: boolean;
}

export const ContextMenuRadioItem: FC<ContextMenuRadioItemProps> = ({
  className,
  children,
  isDanger,
  ...props
}) => {
  return (
    <ContextMenuPrimitive.RadioItem
      className={radioItemVariants({ className, isDanger })}
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
  ContextMenuPrimitive.ContextMenuLabelProps
> = ({ className, ...props }) => {
  return (
    <ContextMenuPrimitive.Label
      className={labelVariants({ className })}
      {...props}
    />
  );
};

export const ContextMenuSeparator: FC<
  ContextMenuPrimitive.ContextMenuSeparatorProps
> = ({ className, ...props }) => {
  return (
    <ContextMenuPrimitive.Separator
      className={separatorVariants({ className })}
      {...props}
    />
  );
};
