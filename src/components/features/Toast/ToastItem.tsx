import { FC, memo, useEffect, useMemo } from "react";
import { Toast } from "@/types/toast.type";
import styles from "@/components/features/Toast/toast.module.scss";
import { removeToast } from "@/redux/reducers/toastSlice";
import { useAppDispatch } from "@/hooks/redux";
import clsx from "clsx";
import { Check, CircleX, Info, TriangleAlert } from "lucide-react";

interface ToastItemProps {
  item: Toast;
}

const ToastItem: FC<ToastItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const icon = useMemo(() => {
    switch (item.type) {
      case "success":
        return <Check />;

      case "info":
        return <Info />;

      case "error":
        return <CircleX />;

      case "warning":
        return <TriangleAlert />;

      default:
        return null;
    }
  }, [item]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(removeToast(item.id));
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, item]);

  return (
    <div className={clsx(styles.item, styles[item.type])}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.message}>{item.message}</div>
    </div>
  );
};

export default memo(ToastItem);
