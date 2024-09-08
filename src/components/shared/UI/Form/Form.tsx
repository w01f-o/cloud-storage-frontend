import { FC, FormHTMLAttributes, ReactNode } from "react";
import styles from "./form.module.scss";
import clsx from "clsx";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  title: string;
  children: ReactNode;
}

const Form: FC<FormProps> = ({ title, children, className, ...props }) => {
  return (
    <form
      className={clsx(styles.form, {
        [`${className}`]: className,
      })}
      {...props}
    >
      <h5 className={styles.title}>{title}</h5>
      {children}
    </form>
  );
};

export default Form;
