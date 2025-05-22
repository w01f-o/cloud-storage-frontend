'use client';

import { throttle } from 'lodash';
import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  Ref,
  useCallback,
  useMemo,
  useRef,
} from 'react';

interface ColorPickerProps extends InputHTMLAttributes<HTMLInputElement> {
  color: string;
  onColorChange: (color: string) => void;
  ref: Ref<HTMLInputElement>;
}

export const ColorPicker: FC<ColorPickerProps> = ({
  color,
  onColorChange,
  ref: propsRef,
  ...props
}) => {
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
        props.onChange?.(e);
      }, 50),
    [onColorChange, props]
  );

  return (
    <div className='border-primary relative shrink-0 overflow-hidden rounded-full border shadow-2xl *:size-8'>
      <input
        type='color'
        className='absolute cursor-pointer opacity-0'
        ref={setRefs}
        {...props}
        onChange={changeHandler}
      />
      <div style={{ background: color }} onClick={clickHandler} />
    </div>
  );
};
