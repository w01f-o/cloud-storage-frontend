"use client";

import { FC, useRef, useState, MouseEvent } from "react";
import { File as FileType } from "@/types/file.type";
import { useRouter } from "next/navigation";
import styles from "./file.module.scss";
import { RootDictionary } from "@/types/dictionaries.type";
import { Utils } from "@/services/utils";
import { File as FileIcon } from "lucide-react";
import TripleDotsIcon from "@/components/shared/Icons/TripleDotsIcon";
import ContextMenu, {
  ContextMenuItemType,
} from "@/components/shared/UI/ContextMenu/ContextMenu";
import FileDeleter from "@/components/features/Files/FileDeleter/fileDeleter";
import FileUpdater from "@/components/features/Files/FileUpdater/FileUpdater";

interface FileProps {
  file: FileType;
  dict: RootDictionary;
  color: string;
}

const File: FC<FileProps> = ({ file, dict, color }) => {
  const router = useRouter();
  const [contextIsOpen, setContextIsOpen] = useState<boolean>(false);
  const contextButtonRef = useRef<HTMLButtonElement | null>(null);

  const [updaterIsOpen, setUpdaterIsOpen] = useState<boolean>(false);
  const [deleterIsOpen, setDeleterIsOpen] = useState<boolean>(false);

  const contextButtonClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setContextIsOpen(true);
  };

  const downloadFile = async () => {
    try {
      const res = await fetch(`/api/file/${file.id}`);
      if (res.ok) {
        router.replace(`/api/file/${file.id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteFile = () => {
    setDeleterIsOpen(true);
  };

  const updateFile = () => {
    setUpdaterIsOpen(true);
  };

  const contextMenuItems: ContextMenuItemType[] = [
    { id: 1, name: "Загрузить", action: downloadFile },
    { id: 2, name: "Переименовать", action: updateFile },
    { id: 3, name: "Удалить", action: deleteFile, isDanger: true },
  ];

  return (
    <div className={styles.wrapper} style={{ background: color }}>
      <FileIcon width={32} height={32} />
      <div className={styles.name}>{file.name}</div>
      <div className={styles.date}>{Utils.getDate(file.addedAt, dict)}</div>
      <button
        className={styles.contextButton}
        ref={contextButtonRef}
        onClick={contextButtonClickHandler}
        onContextMenu={contextButtonClickHandler}
        title="Контекстное меню"
        type="button"
        aria-label="Открыть контекстное меню"
      >
        <TripleDotsIcon fill={Utils.saturateColor(color, 0.2)} />
      </button>
      <ContextMenu
        items={contextMenuItems}
        isOpen={contextIsOpen}
        setIsOpen={setContextIsOpen}
        buttonRef={contextButtonRef}
      />
      <FileDeleter
        modalIsOpen={deleterIsOpen}
        setModalIsOpen={setDeleterIsOpen}
        file={file}
        dict={dict}
      />
      <FileUpdater
        modalIsOpen={updaterIsOpen}
        setModalIsOpen={setUpdaterIsOpen}
        file={file}
        dict={dict}
      />
    </div>
  );
};

export default File;
