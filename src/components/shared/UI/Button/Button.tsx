import { ButtonHTMLAttributes, FC, forwardRef, ReactNode } from "react";
import styles from "./button.module.scss";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type: "submit" | "reset" | "button";
  role: "primary" | "secondary";
  rounded?: boolean;
  title: string;
  isPending?: boolean;
  isDanger?: boolean;
}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type,
      title,
      children,
      role,
      rounded,
      isPending,
      isDanger,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        type={type}
        title={title}
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
