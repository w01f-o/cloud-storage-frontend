import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./button.module.scss";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type: "submit" | "reset" | "button";
  role: "primary" | "secondary";
  rounded?: boolean;
  title: string;
  isPending?: boolean;
}

const Button: FC<ButtonProps> = ({
  type,
  title,
  children,
  role,
  rounded,
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
        [styles.rounded]: rounded,
      })}
      disabled={isPending}
    >
      {isPending ? <div className={styles.loader}></div> : children}
    </button>
  );
};

export default Button;
