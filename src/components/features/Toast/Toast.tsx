import { FC } from "react";
import styles from "./toast.module.scss";
import ToastList from "@/components/features/Toast/ToastList";

const Toast: FC = () => {
  return (
    <div
      className={styles.wrapper}
      style={{ zIndex: 200, position: "relative" }}
    >
      <ToastList />
    </div>
  );
};

export default Toast;
