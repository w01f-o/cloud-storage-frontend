'use client';

import * as ModalPrimitive from '@radix-ui/react-dialog';
import { IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import { AnimatePresence, motion, MotionProps } from 'motion/react';
import {
  ComponentRef,
  createContext,
  FC,
  forwardRef,
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react';
import { tv } from 'tailwind-variants';
import { Heading } from '../heading';
import { Text } from '../text';
import {
  modalBodyVariants,
  modalContentVariants,
  modalOverlayVariants,
} from './modal.variants';
import type { ModalContext, OverflowScroll } from './types/modal.type';

const ModalContext = createContext<ModalContext>({} as ModalContext);

export const Modal: FC<ModalPrimitive.DialogProps> = ({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [overflowScroll, setOverflowScroll] =
    useState<OverflowScroll>('inside');

  const handleOpenChange = onOpenChange ?? setIsOpen;

  return (
    <ModalContext.Provider
      value={{
        isOpen: open ?? isOpen,
        overflowScroll,
        setOverflowScroll,
        setIsOpen: handleOpenChange,
      }}
    >
      <ModalPrimitive.Root
        open={open ?? isOpen}
        onOpenChange={handleOpenChange}
      >
        {children}
      </ModalPrimitive.Root>
    </ModalContext.Provider>
  );
};
export const ModalTrigger = ModalPrimitive.Trigger;
export const ModalPortal = ModalPrimitive.Portal;
export const ModalClose = ModalPrimitive.Close;

interface ModalContentProps extends ModalPrimitive.DialogContentProps {
  size?: 'auto' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  backdrop?: 'blurred' | 'opaque' | 'transparent';
  overflowScroll?: OverflowScroll;
  contentMotionProps?: MotionProps;
  overlayMotionProps?: MotionProps;
}

export const ModalContent = forwardRef<
  ComponentRef<typeof ModalPrimitive.Content>,
  ModalContentProps
>(
  (
    {
      children,
      backdrop,
      rounded,
      size,
      className,
      overflowScroll = 'inside',
      overlayMotionProps = {},
      contentMotionProps = {},
      ...props
    },
    ref
  ) => {
    const { isOpen, setOverflowScroll } = useContext(ModalContext);

    useEffect(() => {
      setOverflowScroll(overflowScroll);
    }, [overflowScroll, setOverflowScroll]);

    return (
      <AnimatePresence>
        {isOpen && (
          <ModalPortal forceMount>
            <ModalPrimitive.Overlay asChild>
              <motion.div
                className={modalOverlayVariants({ backdrop })}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
                {...overlayMotionProps}
              />
            </ModalPrimitive.Overlay>
            <ModalPrimitive.Content
              ref={ref}
              className={clsx(
                'fixed inset-0 z-50 flex h-dvh w-screen justify-center overflow-y-auto',
                {
                  'items-start': overflowScroll === 'outside',
                  'items-center': overflowScroll === 'inside',
                }
              )}
              style={{
                pointerEvents: 'none',
              }}
              {...props}
              forceMount
            >
              <motion.div
                className={modalContentVariants({
                  rounded,
                  size,
                  className,
                  overflowScroll,
                })}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{
                  duration: 0.2,
                  ease: 'easeOut',
                }}
                {...contentMotionProps}
              >
                {children}
                <ModalPrimitive.Close className='absolute top-4 right-4'>
                  <IconX />
                </ModalPrimitive.Close>
              </motion.div>
            </ModalPrimitive.Content>
          </ModalPortal>
        )}
      </AnimatePresence>
    );
  }
);
ModalContent.displayName = ModalPrimitive.Content.displayName;

export const ModalHeader: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={tv({})({ className })}>
      {children}
    </div>
  );
};

export const ModalTitle = forwardRef<
  ComponentRef<typeof ModalPrimitive.Title>,
  ModalPrimitive.DialogTitleProps
>(({ children, ...props }, ref) => {
  return (
    <ModalPrimitive.Title ref={ref} {...props} asChild>
      <Heading size='sm' as='div'>
        {children}
      </Heading>
    </ModalPrimitive.Title>
  );
});
ModalTitle.displayName = ModalPrimitive.Title.displayName;

export const ModalDescription = forwardRef<
  ComponentRef<typeof ModalPrimitive.Description>,
  ModalPrimitive.DialogDescriptionProps
>(({ children, className, ...props }, ref) => {
  return (
    <ModalPrimitive.Description
      ref={ref}
      className={tv({})({ className })}
      asChild
      {...props}
    >
      <Text size='sm'>{children}</Text>
    </ModalPrimitive.Description>
  );
});
ModalDescription.displayName = ModalPrimitive.Description.displayName;

export const ModalBody: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const { overflowScroll } = useContext(ModalContext);

  return (
    <div
      {...props}
      className={modalBodyVariants({ className, overflowScroll })}
    >
      <Text>{children}</Text>
    </div>
  );
};

export const ModalFooter: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={tv({ base: 'flex justify-end' })({ className })}>
      {children}
    </div>
  );
};
