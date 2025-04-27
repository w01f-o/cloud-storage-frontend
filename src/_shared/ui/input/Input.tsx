'use client';

import {
  FC,
  InputHTMLAttributes,
  MouseEvent,
  Ref,
  useCallback,
  useId,
  useRef,
} from 'react';
import {
  inputVariants,
  inputWrapperVariants,
  labelVariants,
  wrapperVariants,
} from './input.variants';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'size'> {
  label?: string;
  isRequired?: boolean;
  isFullWidth?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  ref?: Ref<HTMLInputElement>;
}

export const Input: FC<InputProps> = ({
  type,
  label,
  isFullWidth,
  isInvalid,
  isRequired,
  errorMessage,
  size,
  ref: propsRef,
  ...props
}) => {
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

  const wrapperClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    inputRef.current?.focus();
  };

  return (
    <div
      className={wrapperVariants({ isFullWidth })}
      onClick={wrapperClickHandler}
    >
      <div className={inputWrapperVariants({ isInvalid, size })}>
        <input
          id={id}
          type={type}
          ref={setRefs}
          tabIndex={0}
          className={inputVariants({})}
          aria-invalid={isInvalid || undefined}
          aria-required={isRequired || undefined}
          aria-describedby={errorMessage ? errorId : undefined}
          aria-errormessage={errorMessage ? errorId : undefined}
          {...props}
          placeholder=' '
        />
        <label htmlFor={id} className={labelVariants({})}>
          {label}
          {isRequired && <span className='text-danger ms-0.5'>*</span>}
        </label>
      </div>
      {errorMessage && (
        <p id={errorId} className='text-danger text-sm' role='alert'>
          {errorMessage}
        </p>
      )}
    </div>
  );
};
