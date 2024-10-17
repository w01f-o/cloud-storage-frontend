"use client";

import { FC, useEffect, useMemo, useState } from "react";
import styles from "./toast.module.scss";
import ReactPortal from "@/components/features/ReactPortal/ReactPortal";
import {
  animated,
  SpringConfig,
  SpringValue,
  useTransition,
} from "@react-spring/web";
import { useToast } from "@/hooks/useToast";
import type { Toast as ToastType } from "@/types/toast.type";
import clsx from "clsx";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

const Toast: FC = () => {
  const { list, remove } = useToast();
  const [localItems, setLocalItems] = useState<ToastType[]>(list);

  useEffect(() => {
    setLocalItems(list);
  }, [list]);

  const refMap = useMemo(() => new WeakMap(), []);
  const cancelMap = useMemo(() => new WeakMap(), []);

  const transitions = useTransition(localItems, {
    from: { opacity: 0, height: 0, life: "100%" },
    keys: (item) => item.id,
    enter:
      (item) =>
      async (next, cancel): Promise<void> => {
        cancelMap.set(item, cancel);
        await next({ opacity: 1, height: refMap.get(item).offsetHeight + 8 });
        await next({ life: "0%" });
      },
    leave: [{ opacity: 0 }, { height: 0 }],
    onRest: (_result, _ctrl, item) => {
      setLocalItems((state) =>
        state.filter((i) => {
          return i.id !== item.id;
        }),
      );
      remove(item.id);
    },
    config:
      (_item, _index, phase) =>
      (key): SpringConfig =>
        phase === "enter" && key === "life"
          ? { duration: 3000 }
          : { tension: 125, friction: 20, precision: 0.1 },
  });

  const closeButtonClickHandler =
    (item: ToastType, life: SpringValue<string>) => (): void => {
      if (cancelMap.has(item) && life.get() !== "0%") cancelMap.get(item)();
    };

  return (
    <ReactPortal>
      <div className={styles.wrapper}>
        {transitions(({ life, ...style }, item) => (
          <animated.div style={style}>
            <div
              //@ts-expect-error
              ref={(ref: HTMLDivElement) => ref && refMap.set(item, ref)}
              className={clsx(styles.item, styles[item.type])}
            >
              <div>
                <div>{item.message}</div>
              </div>
              <animated.div style={{ right: life }} className={styles.life} />
              <button
                onClick={closeButtonClickHandler(item, life)}
                className={styles.icon}
              >
                <CloseIcon />
              </button>
            </div>
          </animated.div>
        ))}
      </div>
    </ReactPortal>
  );
};

export default Toast;
