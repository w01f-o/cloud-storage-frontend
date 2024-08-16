import { FC } from "react";
import styles from "./formError.module.scss";

interface FormErrorProps {
  message: string;
}

const FormError: FC<FormErrorProps> = ({ message }) => {
  return <div className={styles.error}>{message}</div>;
};

export default FormError;
