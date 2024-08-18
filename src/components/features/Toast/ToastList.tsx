"use client";

import { FC } from "react";
import ToastItem from "@/components/features/Toast/ToastItem";
import { animated, useTransition } from "@react-spring/web";
import { useToast } from "@/hooks/useToast";

const ToastList: FC = () => {
  const { list } = useToast();

  const transitions = useTransition(list, {
    from: { opacity: 0, transform: "translate3d(150px, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(150px, 0, 0)" },
  });

  return transitions((style, item) => (
    <animated.div key={item.id} style={style}>
      <ToastItem item={item} />
    </animated.div>
  ));
};

export default ToastList;
