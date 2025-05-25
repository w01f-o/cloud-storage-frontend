'use client';

import { FC, InputHTMLAttributes, ReactNode, Ref } from 'react';
import {
  inputVariants,
  inputWrapperVariants,
  labelVariants,
  wrapperVariants,
} from './input.variants';
import { useInput } from './use-input';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'size'> {
  label?: string;
  isRequired?: boolean;
  isFullWidth?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'default';
  startContent?: ReactNode;
  endContent?: ReactNode;
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
  startContent,
  endContent,
  color,
  ref: propsRef,
  ...props
}) => {
  const { errorId, id, setRefs, wrapperClickHandler } = useInput({
    propsRef,
  });

  return (
    <div
      className={wrapperVariants({ isFullWidth })}
      onClick={wrapperClickHandler}
    >
      <div
        className={inputWrapperVariants({
          isInvalid,
          size,
          withLabel: !!label,
          color,
        })}
      >
        {startContent && <span>{startContent}</span>}
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
        {endContent && <span>{endContent}</span>}
        {label && (
          <label htmlFor={id} className={labelVariants({})}>
            {label}
            {isRequired && <span className='text-danger ms-0.5'>*</span>}
          </label>
        )}
      </div>
      {errorMessage && (
        <p id={errorId} className='text-danger text-sm' role='alert'>
          {errorMessage}
        </p>
      )}
    </div>
  );
};
