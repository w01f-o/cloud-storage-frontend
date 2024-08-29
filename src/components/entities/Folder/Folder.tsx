"use client";

import { FC, MouseEvent, useRef, useState } from "react";
import styles from "./folder.module.scss";
import type { Folder } from "@/types/folder.type";
import Link from "next/link";
import FolderIcon from "@/components/shared/Icons/FolderIcon";
import { Utils } from "@/services/utils";
import ContextMenu, {
  ContextMenuItemType,
} from "@/components/shared/UI/ContextMenu/ContextMenu";
import { RootDictionary } from "@/types/dictionaries.type";
import TripleDotsIcon from "@/components/shared/Icons/TripleDotsIcon";
import { useRouter } from "next/navigation";
import DeleteFolder from "@/components/features/Folders/FolderDeleter/DeleteFolder";
import UpdateFolder from "@/components/features/Folders/FolderUpdater/UpdateFolder";

interface FolderProps {
  folder: Folder;
  dict: RootDictionary;
}

const Folder: FC<FolderProps> = ({ folder, dict }) => {
  const [contextIsOpen, setContextIsOpen] = useState<boolean>(false);

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState<boolean>(false);

  const contextButtonRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  const contextMenuClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setContextIsOpen(!contextIsOpen);
  };

  const getDate = (date: Date) => {
    const now = new Date(date);

    return `${
      dict.date.month[now.getMonth()]
    } ${now.getDate()}, ${now.getFullYear()}`;
  };

  const contextMenuHandler =
    (action: "open" | "update" | "delete") => (): void => {
      switch (action) {
        case "open":
          router.push(`/folder/${folder.id}`);
          break;

        case "update":
          setUpdateModalIsOpen(true);
          break;

        case "delete":
          setDeleteModalIsOpen(true);
          break;

        default:
          break;
      }
    };

  const contextMenuItems: ContextMenuItemType[] = [
    {
      id: 1,
      name: dict.folders.contextMenu.open,
      action: contextMenuHandler("open"),
    },
    {
      id: 2,
      name: dict.folders.contextMenu.update,
      action: contextMenuHandler("update"),
    },
    {
      id: 3,
      name: dict.folders.contextMenu.delete,
      action: contextMenuHandler("delete"),
      isDanger: true,
    },
  ];

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
        onClick={contextMenuClickHandler}
        onContextMenu={contextMenuClickHandler}
        ref={contextButtonRef}
        title="Контекстное меню"
        type="button"
        aria-label="Открыть контекстное меню"
      >
        <TripleDotsIcon fill={Utils.saturateColor(folder.color, 0.2)} />
      </button>
      <ContextMenu
        items={contextMenuItems}
        isOpen={contextIsOpen}
        setIsOpen={setContextIsOpen}
        buttonRef={contextButtonRef}
      />
      <DeleteFolder
        folder={folder}
        modalIsOpen={deleteModalIsOpen}
        setModalIsOpen={setDeleteModalIsOpen}
        dict={dict}
      />
      <UpdateFolder
        folder={folder}
        modalIsOpen={updateModalIsOpen}
        setModalIsOpen={setUpdateModalIsOpen}
        dict={dict}
      />
    </div>
  );
};

export default Folder;
