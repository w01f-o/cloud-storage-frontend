import { FC, forwardRef, InputHTMLAttributes, ReactNode } from "react";
import styles from "./field.module.scss";
import clsx from "clsx";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: {
    element: ReactNode;
    position: "left" | "right";
  };
}

const Field: FC<FieldProps> = forwardRef<HTMLInputElement, FieldProps>(
  ({ icon, className, ...props }, ref) => {
    return (
      <label
        className={clsx(styles.label, {
          [styles.iconOffset]: icon,
          [styles.iconRight]: icon?.position === "right",
          [styles.iconLeft]: icon?.position === "left",
        })}
      >
        {icon && icon.element}
        <input
          type="text"
          className={clsx(styles.input, className)}
          ref={ref}
          {...props}
        />
      </label>
    );
  },
);

Field.displayName = "Field";

export default Field;
