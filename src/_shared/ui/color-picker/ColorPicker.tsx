'use client';

import { FC, InputHTMLAttributes, Ref } from 'react';
import { colorPickerVariants } from './color-picker.variants';
import { useColorPicker } from './use-color-picker';

interface ColorPickerProps extends InputHTMLAttributes<HTMLInputElement> {
  color: string;
  onColorChange: (color: string) => void;
  ref: Ref<HTMLInputElement>;
}

export const ColorPicker: FC<ColorPickerProps> = ({
  color,
  onColorChange,
  ref: propsRef,
  className,
  ...props
}) => {
  const { changeHandler, clickHandler, setRefs } = useColorPicker({
    onChange: props.onChange,
    propsRef,
    onColorChange,
  });

  return (
    <div className={colorPickerVariants({ className })}>
      <input
        type='color'
        className='absolute cursor-pointer opacity-0'
        ref={setRefs}
        {...props}
        defaultValue={color}
        onChange={changeHandler}
      />
      <div style={{ background: color }} onClick={clickHandler} />
    </div>
  );
};
