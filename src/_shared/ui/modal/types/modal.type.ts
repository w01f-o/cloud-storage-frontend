export type OverflowScroll = 'inside' | 'outside';

export interface ModalContext {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;

  overflowScroll: OverflowScroll;
  setOverflowScroll: (value: OverflowScroll) => void;
}
