import { FC } from "react";
import styles from "./folder.module.scss";
import type { Folder } from "@/types/folder.type";

interface FolderProps {
  folder: Folder;
}

const Folder: FC<FolderProps> = ({ folder }) => {
  return <div className={styles.folder}>{folder.name}</div>;
};

export default Folder;
