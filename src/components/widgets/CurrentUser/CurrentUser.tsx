"use client";

import { FC, useState } from "react";
import styles from "./currentUser.module.scss";
import Image from "next/image";
import Link from "next/link";
import ReactPortal from "@/components/features/ReactPortal/ReactPortal";

const CurrentUser: FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <Link className={styles.wrapper} href="/profile">
      <div className={styles.avatar}>
        <Image src={"/no-avatar.svg"} alt={"avatar"} width={50} height={50} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>Example name</div>
        <div className={styles.email}>example@example.ru</div>
      </div>
    </Link>
  );
};

export default CurrentUser;
