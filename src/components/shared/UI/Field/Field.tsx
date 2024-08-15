import { FC, InputHTMLAttributes } from "react";
import styles from "./field.module.scss";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {}

const Field: FC<FieldProps> = ({ ...props }) => {
  return <input type="text" className={styles.input} {...props} />;
};

export default Field;
