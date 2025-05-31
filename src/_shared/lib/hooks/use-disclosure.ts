'use client';

import { useCallback, useState } from 'react';

interface UseDisclosureParams {
  initialState: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useDisclosure = ({
  initialState = false,
  onClose,
  onOpen,
}: Partial<UseDisclosureParams> = {}) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(
    () => (isOpen ? close() : open()),
    [isOpen, close, open]
  );

  return { isOpen, open, close, toggle };
};
