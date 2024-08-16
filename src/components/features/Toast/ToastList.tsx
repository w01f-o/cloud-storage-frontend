"use client";

import { FC } from "react";
import { useAppSelector } from "@/hooks/redux";
import ToastItem from "@/components/features/Toast/ToastItem";
import { animated, useTransition } from "@react-spring/web";

const ToastList: FC = () => {
  const items = useAppSelector((state) => state.toast.items);

  const transitions = useTransition(items, {
    from: { opacity: 0, transform: "translate3d(50px, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(50px, 0, 0)" },
  });

  return transitions((style, item) => (
    <animated.div key={item.id} style={style}>
      <ToastItem item={item} />
    </animated.div>
  ));
};

export default ToastList;
