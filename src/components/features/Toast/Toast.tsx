import { FC } from "react";
import styles from "./toast.module.scss";
import ToastList from "@/components/features/Toast/ToastList";

const Toast: FC = () => {
  return (
    <div className={styles.wrapper}>
      <ToastList />
    </div>
  );
};

export default Toast;
