import { FC } from "react";
import styles from "./currentUser.module.scss";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/services/auth/auth";

const CurrentUser: FC = async () => {
  const session = await auth();
  const user = session?.user;

  const getAvatar = () => {
    if (user) {
      return `http://localhost:5000/${user.image}`;
    } else {
      return `http://localhost:5000/no-avatar.svg`;
    }
  };

  return (
    <Link
      className={styles.wrapper}
      href={`${user ? "/profile" : "/auth/signIn"}`}
    >
      <div className={styles.avatar}>
        <Image
          src={getAvatar()}
          alt={"avatar"}
          width={50}
          height={50}
          priority={true}
        />
      </div>
      <div className={styles.info}>
        {user ? (
          <>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.email}>{user.email}</div>
          </>
        ) : (
          <div className={styles.login}>Войти</div>
        )}
      </div>
    </Link>
  );
};

export default CurrentUser;
