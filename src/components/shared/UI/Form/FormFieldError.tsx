import { ReactNode } from "react";
import { FieldErrors } from "react-hook-form";
import styles from "./form.module.scss";

interface FormFieldErrorProps<T extends FieldErrors> {
  errors: T;
  field: keyof T;
}

const FormFieldError = <T extends FieldErrors>({
  errors,
  field,
}: FormFieldErrorProps<T>) => {
  return (
    errors[field] && (
      <div className={styles.error}>{errors[field]?.message as ReactNode}</div>
    )
  );
};

export default FormFieldError;
