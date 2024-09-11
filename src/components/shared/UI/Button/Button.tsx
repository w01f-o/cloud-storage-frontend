import { ButtonHTMLAttributes, FC, forwardRef, ReactNode } from "react";
import styles from "./button.module.scss";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  role: "primary" | "secondary";
  rounded?: boolean;
  isPending?: boolean;
  isDanger?: boolean;
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, role, rounded, isPending, isDanger, className, ...props },
    ref,
  ) => {
    return (
      <button
        {...props}
        className={clsx(styles.button, styles[role], className, {
          [styles.pending]: isPending,
          [styles.rounded]: rounded,
          [styles.danger]: isDanger,
        })}
        ref={ref}
        disabled={isPending}
      >
        {isPending ? <div className={styles.loader}></div> : children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
