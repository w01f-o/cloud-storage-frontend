"use client";

import { FC, MouseEvent, useRef, useState } from "react";
import styles from "./folder.module.scss";
import type { Folder } from "@/types/folder.type";
import Link from "next/link";
import FolderIcon from "@/components/shared/Icons/FolderIcon";
import { getDictionary } from "@/actions/lang.action";
import { Utils } from "@/services/utils";
import ContextMenu from "@/components/shared/UI/ContextMenu/ContextMenu";
import { RootDictionary } from "@/types/dictionaries.type";
import TripleDotsIcon from "@/components/shared/Icons/TripleDotsIcon";

interface FolderProps {
  folder: Folder;
  dict: RootDictionary;
}

const Folder: FC<FolderProps> = ({ folder, dict }) => {
  const [contextIsOpen, setContextIsOpen] = useState<boolean>(false);
  const contextButtonRef = useRef<HTMLButtonElement | null>(null);
  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setContextIsOpen(!contextIsOpen);
  };

  const getDate = (date: Date) => {
    const now = new Date(date);

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
      <button
        className={styles.contextButton}
        onClick={clickHandler}
        onContextMenu={clickHandler}
        ref={contextButtonRef}
        title="Контекстное меню"
        type="button"
        aria-label="Открыть контекстное меню"
      >
        <TripleDotsIcon fill={Utils.saturateColor(folder.color, 0.2)} />
      </button>
      <ContextMenu
        items={[
          { id: 1, name: "Открыть", action: () => {} },
          { id: 2, name: "Изменить цвет", action: () => {} },
          { id: 3, name: "Удалить папку", action: () => {}, isDanger: true },
        ]}
        isOpen={contextIsOpen}
        setIsOpen={setContextIsOpen}
        buttonRef={contextButtonRef}
      />
    </div>
  );
};

export default Folder;
