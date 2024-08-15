import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import styles from "./button.module.scss";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: "submit" | "reset" | "button";
  title: string;
  children: ReactNode;
  role: "primary" | "secondary";
}

const Button: FC<ButtonProps> = ({ type, title, children, role, ...props }) => {
  return (
    <button
      type={type}
      title={title}
      {...props}
      className={clsx(styles.button, styles[role])}
    >
      {children}
    </button>
  );
};

export default Button;
