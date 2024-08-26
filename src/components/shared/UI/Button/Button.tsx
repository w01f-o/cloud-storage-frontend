import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./button.module.scss";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: "submit" | "reset" | "button";
  title: string;
  children: ReactNode;
  role: "primary" | "secondary";
  isPending?: boolean;
}

const Button: FC<ButtonProps> = ({
  type,
  title,
  children,
  role,
  isPending,
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      title={title}
      {...props}
      className={clsx(styles.button, styles[role], className, {
        [styles.pending]: isPending,
      })}
      disabled={isPending}
    >
      {isPending ? <div className={styles.loader}></div> : children}
    </button>
  );
};

export default Button;
