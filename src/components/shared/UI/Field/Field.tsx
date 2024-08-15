import { FC, InputHTMLAttributes, ReactNode } from "react";
import styles from "./field.module.scss";
import clsx from "clsx";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: {
    element: ReactNode;
    position: "left" | "right";
  };
}

const Field: FC<FieldProps> = ({ icon, ...props }) => {
  return (
    <label
      className={clsx(styles.label, {
        [styles.iconOffset]: icon,
        [styles.iconRight]: icon?.position === "right",
        [styles.iconLeft]: icon?.position === "left",
      })}
    >
      {icon && icon.element}
      <input type="text" className={styles.input} {...props} />
    </label>
  );
};

export default Field;
