import { FC } from "react";
import styles from "./sidebar.module.scss";
import { FoldersApi } from "@/services/folders.api";
import { cookies } from "next/headers";

const SideBar: FC = async () => {
  const cookieStore = cookies();
  const test = await FoldersApi.getAll(cookieStore);

  return <aside className={styles.sidebar}>{JSON.stringify(test)}</aside>;
};

export default SideBar;
