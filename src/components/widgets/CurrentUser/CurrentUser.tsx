import { FC } from "react";
import styles from "./currentUser.module.scss";
import Image from "next/image";

const CurrentUser: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar}>
        <Image src={"/no-avatar.svg"} alt={"avatar"} width={50} height={50} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>Иван Иванов</div>
        <div className={styles.email}>example@mail.ru</div>
      </div>
    </div>
  );
};

export default CurrentUser;
