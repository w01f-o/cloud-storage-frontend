import { FC, MouseEvent, useEffect, useMemo } from "react";
import { Toast } from "@/types/toast.type";
import styles from "@/components/features/Toast/toast.module.scss";
import { useAppSelector } from "@/hooks/redux";
import clsx from "clsx";
import { Check, CircleX, Info, TriangleAlert } from "lucide-react";
import { useToast } from "@/hooks/useToast";

interface ToastItemProps {
  item: Toast;
}

const ToastItem: FC<ToastItemProps> = ({ item }) => {
  const { remove } = useToast();
  const items = useAppSelector((state) => state.toast.items);

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
      remove(item.id);
    }, 1000 + items.length * 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [item, items.length, remove]);

  const index = items.findIndex((i) => i.id === item.id);

  const closeMouseUpHandler = (e: MouseEvent<HTMLDivElement>) => {
    remove(item.id);
  };

  return (
    <div
      className={clsx(styles.item, styles[item.type])}
      style={{
        transform: `translateY(-${index * 100 + 20}px)`,
      }}
      onMouseUp={closeMouseUpHandler}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.message}>{item.message}</div>
    </div>
  );
};

export default ToastItem;
