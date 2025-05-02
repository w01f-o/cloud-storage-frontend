'use client';

import { useState } from 'react';

interface UseDisclosureProps {
  initialState: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useDisclosure = ({
  initialState = false,
  onClose,
  onOpen,
}: Partial<UseDisclosureProps> = {}) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const open = () => {
    setIsOpen(true);
    onOpen?.();
  };

  const close = () => {
    setIsOpen(false);
    onClose?.();
  };

  const toggle = () => (isOpen ? close() : open());

  return { isOpen, open, close, toggle };
};
