"use client";

import { FC, MouseEvent, useRef, useState } from "react";
import { File as FileType } from "@/types/file.type";
import { useRouter } from "next/navigation";
import styles from "./file.module.scss";
import { RootDictionary } from "@/types/dictionaries.type";
import { Utils } from "@/services/utils";
import TripleDotsIcon from "@/components/shared/Icons/TripleDotsIcon";
import ContextMenu, {
  ContextMenuItemType,
} from "@/components/shared/UI/ContextMenu/ContextMenu";
import FileDeleter from "@/components/features/Files/FileDeleter/fileDeleter";
import FileUpdater from "@/components/features/Files/FileUpdater/FileUpdater";
import FileIcons from "@/components/widgets/FileIcons/FileIcons";
import clsx from "clsx";

interface FileProps {
  file: FileType;
  dict: RootDictionary;
  extended: boolean;
}

const File: FC<FileProps> = ({ file, dict, extended }) => {
  const router = useRouter();
  const [contextIsOpen, setContextIsOpen] = useState<boolean>(false);
  const contextButtonRef = useRef<HTMLButtonElement | null>(null);

  const [updaterIsOpen, setUpdaterIsOpen] = useState<boolean>(false);
  const [deleterIsOpen, setDeleterIsOpen] = useState<boolean>(false);

  const contextButtonClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setContextIsOpen(!contextIsOpen);
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

  const shareFile = () => {};

  const contextMenuItems: ContextMenuItemType[] = [
    { id: 1, name: dict.files.actions.download, action: downloadFile },
    { id: 2, name: dict.files.actions.rename, action: updateFile },
    { id: 3, name: dict.files.actions.share, action: shareFile },
    {
      id: 4,
      name: dict.files.actions.delete,
      action: deleteFile,
      isDanger: true,
    },
  ];

  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.minify]: !extended,
      })}
    >
      <FileIcons fileType={file.type} />
      {extended ? (
        <>
          <div className={styles.name}>{file.name}</div>
          <div className={styles.info}>
            <div className={styles.date}>
              {Utils.getDate(file.addedAt, dict)}
            </div>
            <div className={styles.size}>
              {Math.round(file.size / 1024)} кбайт
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.info}>
            <div className={styles.name}> {file.name}</div>
            <div className={styles.date}>
              {Utils.getDate(file.addedAt, dict)}
            </div>
          </div>
          <div className={styles.size}>
            {Math.round(file.size / 1024)} кбайт
          </div>
        </>
      )}
      {extended && (
        <>
          <button
            className={styles.contextButton}
            ref={contextButtonRef}
            onClick={contextButtonClickHandler}
            onContextMenu={contextButtonClickHandler}
            title={dict.contextMenu.title}
            type="button"
            aria-label={dict.contextMenu.ariaLabel}
          >
            <TripleDotsIcon fill={"#567df4"} />
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
        </>
      )}
    </div>
  );
};

export default File;
