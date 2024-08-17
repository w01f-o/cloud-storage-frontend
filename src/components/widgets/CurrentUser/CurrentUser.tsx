import { FC } from "react";
import styles from "./currentUser.module.scss";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/services/auth/auth";
import { RootDictionary } from "@/types/dictionaries.type";

interface CurrentUserProps {
  dict: RootDictionary;
}

const CurrentUser: FC<CurrentUserProps> = async ({ dict }) => {
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
      href={`${user ? "/profile" : "/auth/login"}`}
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
          <div className={styles.login}>{dict.auth.login}</div>
        )}
      </div>
    </Link>
  );
};

export default CurrentUser;
