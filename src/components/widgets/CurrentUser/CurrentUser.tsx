import { FC } from "react";
import styles from "./currentUser.module.scss";
import Image from "next/image";
import Link from "next/link";

const CurrentUser: FC = () => {
  return (
    <Link className={styles.wrapper} href="/profile">
      <div className={styles.avatar}>
        <Image src={"/no-avatar.svg"} alt={"avatar"} width={50} height={50} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>Иван Иванов</div>
        <div className={styles.email}>example@mail.ru</div>
      </div>
    </Link>
  );
};

export default CurrentUser;