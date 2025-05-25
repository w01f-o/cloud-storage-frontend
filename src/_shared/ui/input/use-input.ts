import { Ref, useCallback, useId, useRef } from 'react';

interface UseInputParams {
  propsRef?: Ref<HTMLInputElement>;
}

interface UseInputReturn {
  inputRef: Ref<HTMLInputElement>;
  id: string;
  errorId: string;
  wrapperClickHandler: () => void;
  setRefs: (el: HTMLInputElement) => void;
}

export const useInput = ({ propsRef }: UseInputParams): UseInputReturn => {
  const id = useId();
  const errorId = `${id}-error`;
  const inputRef = useRef<HTMLInputElement>(null);

  const setRefs = useCallback(
    (el: HTMLInputElement) => {
      inputRef.current = el;

      if (typeof propsRef === 'function') {
        propsRef(el);
      } else if (propsRef) {
        propsRef.current = el;
      }
    },
    [propsRef]
  );

  const wrapperClickHandler = () => {
    inputRef.current?.focus();
  };

  return {
    errorId,
    id,
    inputRef,
    wrapperClickHandler,
    setRefs,
  };
};
