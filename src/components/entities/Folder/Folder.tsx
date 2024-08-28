"use client";

import { FC } from "react";
import styles from "./folder.module.scss";
import type { Folder } from "@/types/folder.type";
import Link from "next/link";
import FolderIcon from "@/components/shared/Icons/FolderIcon";
import { getDictionary } from "@/actions/lang.action";
import TrippleDotsIcon from "@/components/shared/Icons/TrippleDotsIcon";
import { Utils } from "@/services/utils";
import ContextMenu from "@/components/shared/UI/ContextMenu/ContextMenu";
import { RootDictionary } from "@/types/dictionaries.type";

interface FolderProps {
  folder: Folder;
  dict: RootDictionary;
}

const Folder: FC<FolderProps> = ({ folder, dict }) => {
  const getDate = (date: Date) => {
    const now = new Date();

    return `${
      dict.date.month[now.getMonth()]
    } ${now.getDate()}, ${now.getFullYear()}`;
  };

  return (
    <div className={styles.wrapper}>
      <Link
        className={styles.folder}
        style={{ background: folder.color }}
        href={`/folder/${folder.id}`}
      >
        <FolderIcon color={folder.color} className={styles.icon} />
        <div className={styles.info}>
          <div className={styles.name}>{folder.name}</div>
          <div className={styles.date}>{getDate(folder.editedAt)}</div>
        </div>
      </Link>
      <ContextMenu
        color={Utils.saturateColor(folder.color, 0.2)}
        buttonClassName={styles.contextButton}
        items={[
          { id: 1, name: "Удалить папку", action: () => {} },
          { id: 2, name: "Изменить цвет", action: () => {} },
        ]}
      />
    </div>
  );
};

export default Folder;
