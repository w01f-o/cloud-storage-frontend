"use client";

import {
  ChangeEvent,
  Dispatch,
  FC,
  InputHTMLAttributes,
  SetStateAction,
} from "react";
import styles from "./field.module.scss";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
}

const Field: FC<FieldProps> = ({ value, setValue, ...props }) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(e.target.value);
  };

  return (
    <input
      type="text"
      className={styles.input}
      value={value}
      onChange={changeHandler}
      {...props}
    />
  );
};

export default Field;
