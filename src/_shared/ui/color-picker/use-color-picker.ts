import throttle from 'lodash/throttle';
import { ChangeEvent, Ref, useCallback, useMemo, useRef } from 'react';

interface UseColorPickerParams {
  propsRef: Ref<HTMLInputElement>;
  onChange: ((e: ChangeEvent<HTMLInputElement>) => void) | undefined;
  onColorChange: (color: string) => void;
}

interface UseColorPickerReturn {
  setRefs: (el: HTMLInputElement) => void;
  clickHandler: () => void;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const useColorPicker = ({
  propsRef,
  onChange,
  onColorChange,
}: UseColorPickerParams): UseColorPickerReturn => {
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

  const clickHandler = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const changeHandler = useMemo(
    () =>
      throttle((e: ChangeEvent<HTMLInputElement>) => {
        onColorChange(e.target.value);
        onChange?.(e);
      }, 50),
    [onChange, onColorChange]
  );

  return { setRefs, clickHandler, changeHandler };
};
