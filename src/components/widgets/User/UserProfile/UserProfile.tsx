import { FC } from "react";
import styles from "./userProfile.module.scss";
import { UserApi } from "@/services/api/index.api";
import Image from "next/image";

const UserProfile: FC = async () => {
  const { data: user } = await UserApi.getUser();

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Image
          src={`${process.env.NEXT_PUBLIC_STATIC_BASE_URL}/${user.avatar}`}
          alt={"avatar"}
          width={200}
          height={200}
          priority={true}
        />
      </div>
      <div className={styles.name}>{user.name}</div>
      <div className={styles.email}>{user.email}</div>
    </div>
  );
};

export default UserProfile;
