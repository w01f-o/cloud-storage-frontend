"use client";

import { FC } from "react";
import { animated, useSpring } from "@react-spring/web";
import CloudIcon from "@/components/shared/Icons/CloudIcon";
import styles from "./welcomeBackground.module.scss";

const WelcomeBackground: FC = () => {
  const styleFromTop = useSpring({
    from: { opacity: 0, y: "-100%" },
    to: { opacity: 1, y: "0" },
    config: { mass: 6, friction: 120, tension: 120 },
  });

  const styleFromLeft = useSpring({
    from: { opacity: 0, x: "-100%" },
    to: { opacity: 1, x: "0" },
    config: { mass: 4, friction: 120, tension: 120 },
  });

  const styleFromRight = useSpring({
    from: { opacity: 0, x: "100%" },
    to: { opacity: 1, x: "0" },
    config: { mass: 5, friction: 120, tension: 120 },
  });

  return (
    <div className={styles.box}>
      <animated.div style={{ ...styleFromLeft, top: 50, right: 40 }}>
        <CloudIcon size="large" />
      </animated.div>
      <animated.div style={{ ...styleFromTop, top: 70, left: 40 }}>
        <CloudIcon size="large" />
      </animated.div>
      <animated.div style={{ ...styleFromTop, top: 200, right: 270 }}>
        <CloudIcon size="large" />
      </animated.div>
      <animated.div style={{ ...styleFromTop, top: 150, left: 270 }}>
        <CloudIcon size="large" />
      </animated.div>
      <animated.div style={{ ...styleFromRight, top: 100, right: 600 }}>
        <CloudIcon size="large" />
      </animated.div>
    </div>
  );
};

export default animated(WelcomeBackground);
