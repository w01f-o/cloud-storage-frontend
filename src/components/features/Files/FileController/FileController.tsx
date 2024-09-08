"use client";

import { FC, MouseEvent, useRef, useState } from "react";
import { RootDictionary } from "@/types/dictionaries.type";
import styles from "@/components/entities/File/file.module.scss";
import TripleDotsIcon from "@/components/shared/Icons/TripleDotsIcon";
import ContextMenu, {
  ContextMenuItemType,
} from "@/components/shared/UI/ContextMenu/ContextMenu";
import FileDeleter from "@/components/features/Files/FileDeleter/fileDeleter";
import FileUpdater from "@/components/features/Files/FileUpdater/FileUpdater";
import FileSharer from "@/components/features/Files/FileSharer/FileSharer";
import { useRouter } from "next/navigation";
import { File } from "@/types/file.type";
import Modal from "@/components/shared/UI/Modal/Modal";
import Button from "@/components/shared/UI/Button/Button";

interface FileControllerProps {
  dict: RootDictionary;
  file: File;
  isMobile: boolean;
}

const FileController: FC<FileControllerProps> = ({ dict, file, isMobile }) => {
  const [contextIsOpen, setContextIsOpen] = useState<boolean>(false);
  const contextButtonRef = useRef<HTMLButtonElement | null>(null);

  const contextButtonClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setContextIsOpen(!contextIsOpen);
  };

  const [updaterIsOpen, setUpdaterIsOpen] = useState<boolean>(false);
  const [deleterIsOpen, setDeleterIsOpen] = useState<boolean>(false);
  const [sharerIsOpen, setSharerIsOpen] = useState<boolean>(false);

  const deleteFile = () => {
    setDeleterIsOpen(!deleterIsOpen);
  };

  const updateFile = () => {
    setUpdaterIsOpen(!updaterIsOpen);
  };

  const shareFile = () => {
    setSharerIsOpen(!sharerIsOpen);
  };

  const router = useRouter();

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
      {!isMobile && (
        <ContextMenu
          items={contextMenuItems}
          isOpen={contextIsOpen}
          setIsOpen={setContextIsOpen}
          buttonRef={contextButtonRef}
        />
      )}
      {isMobile && (
        <Modal
          isOpen={contextIsOpen}
          setIsOpen={setContextIsOpen}
          contentClassName={styles.modal}
        >
          <div className={styles.mobileContext}>
            {contextMenuItems.map((item) => (
              <Button
                key={item.id}
                type={"button"}
                role={"secondary"}
                title={item.name}
                onClick={() => {
                  setContextIsOpen(false);
                  item.action();
                }}
                isDanger={item.isDanger}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </Modal>
      )}
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
      <FileSharer
        modalIsOpen={sharerIsOpen}
        setModalIsOpen={setSharerIsOpen}
        dict={dict}
        file={file}
      />
    </>
  );
};

export default FileController;
