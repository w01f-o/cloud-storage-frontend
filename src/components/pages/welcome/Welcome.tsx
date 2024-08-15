"use client";

import { FC } from "react";
import styles from "./welcome.module.scss";
import WelcomeIcon from "@/components/shared/Icons/WelcomeIcon";
import Button from "@/components/shared/UI/Button/Button";
import Link from "next/link";
import ArrowIcon from "@/components/shared/Icons/ArrowIcon";
import WelcomeBackground from "@/components/widgets/WelcomeBackground/WelcomeBackground";
import { useSpring, animated } from "@react-spring/web";

const Welcome: FC = () => {
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
      <WelcomeBackground />
      <animated.div className={styles.welcome} style={animatedBoxStyle}>
        <WelcomeIcon className={styles.svg} />
        <h1 className={styles.title}>Добро пожаловать в</h1>
        <h2 className={styles.subTitle}>Cloud Storage</h2>
        <p className={styles.description}>
          Надежное и удобное облачное хранилище <br />
          для ваших файлов с неограниченным <br />
          доступом из любой точки мира.
        </p>
      </animated.div>
      <div className={styles.links}>
        <animated.div style={leftButtonStyle}>
          <Link href="/auth/login">
            <Button type="button" title="Войти" role="primary">
              Войти
              <ArrowIcon />
            </Button>
          </Link>
        </animated.div>
        <animated.div style={rightButtonStyle}>
          <Link href="/auth/registration">
            <Button type="button" title="Войти" role="secondary">
              Зарегистрироваться
            </Button>
          </Link>
        </animated.div>
      </div>
    </div>
  );
};

export default animated(Welcome);
