"use client";

import { FC } from "react";
import styles from "./welcome.module.scss";
import WelcomeIcon from "@/components/shared/Icons/WelcomeIcon";
import Button from "@/components/shared/UI/Button/Button";
import Link from "next/link";
import ArrowIcon from "@/components/shared/Icons/ArrowIcon";
import WelcomeBackground from "@/components/widgets/WelcomeBackground/WelcomeBackground";
import { animated, useSpring } from "@react-spring/web";
import { RootDictionary } from "@/types/dictionaries.type";
import { RoutePaths } from "@/enums/RoutePaths.enum";

interface WelcomeProps {
  dict: RootDictionary;
  isMobile: boolean;
}

const Welcome: FC<WelcomeProps> = ({ dict, isMobile }) => {
  const leftButtonStyle = useSpring({
    from: { opacity: 0, x: "-50%" },
    to: { opacity: 1, x: "0" },
    config: { mass: 2, tension: 120, friction: 50 },
  });

  const rightButtonStyle = useSpring({
    from: { opacity: 0, x: "50%" },
    to: { opacity: 1, x: "0" },
    config: { mass: 2, tension: 120, friction: 50 },
  });

  const animatedBoxStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { mass: 5, tension: 120, friction: 120 },
  });

  return (
    <div className={styles.wrapper}>
      {!isMobile && <WelcomeBackground />}
      <animated.div className={styles.welcome} style={animatedBoxStyle}>
        <div className={styles.welcome}>
          <WelcomeIcon className={styles.svg} />
          <h1 className={styles.title}>{dict.welcome.title}</h1>
          <h2 className={styles.subTitle}>{dict.welcome.subtitle}</h2>
          <p className={styles.description}>{dict.welcome.description}</p>
        </div>
      </animated.div>
      <div className={styles.links}>
        <animated.div style={leftButtonStyle}>
          <Link href={RoutePaths.LOGIN}>
            <Button role={"primary"}>
              {dict.auth.login}
              <ArrowIcon />
            </Button>
          </Link>
        </animated.div>
        <animated.div style={rightButtonStyle}>
          <Link href={RoutePaths.REGISTRATION}>
            <Button role={"secondary"}>{dict.auth.registration}</Button>
          </Link>
        </animated.div>
      </div>
    </div>
  );
};

export default animated(Welcome);
