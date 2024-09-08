"use client";

import { FC, MouseEvent, useRef, useState } from "react";
import styles from "@/components/entities/Folder/folder.module.scss";
import TripleDotsIcon from "@/components/shared/Icons/TripleDotsIcon";
import { Utils } from "@/services/utils";
import ContextMenu, {
  ContextMenuItemType,
} from "@/components/shared/UI/ContextMenu/ContextMenu";
import FolderDeleter from "@/components/features/Folders/FolderDeleter/FolderDeleter";
import FolderUpdater from "@/components/features/Folders/FolderUpdater/FolderUpdater";
import { useRouter } from "next/navigation";
import { RootDictionary } from "@/types/dictionaries.type";
import { Folder as FolderType } from "@/types/folder.type";
import Modal from "@/components/shared/UI/Modal/Modal";
import Button from "@/components/shared/UI/Button/Button";

interface FolderControllerProps {
  dict: RootDictionary;
  folder: FolderType;
  isMobile: boolean;
}

const FolderController: FC<FolderControllerProps> = ({
  dict,
  folder,
  isMobile,
}) => {
  const [contextIsOpen, setContextIsOpen] = useState<boolean>(false);

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState<boolean>(false);

  const contextButtonRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  const contextMenuClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setContextIsOpen(!contextIsOpen);
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
      name: dict.folders.actions.open,
      action: contextMenuHandler("open"),
    },
    {
      id: 2,
      name: dict.folders.actions.update,
      action: contextMenuHandler("update"),
    },
    {
      id: 3,
      name: dict.folders.actions.delete,
      action: contextMenuHandler("delete"),
      isDanger: true,
    },
  ];

  return (
    <>
      <button
        className={styles.contextButton}
        onClick={contextMenuClickHandler}
        onContextMenu={contextMenuClickHandler}
        ref={contextButtonRef}
        title={dict.contextMenu.title}
        type="button"
        aria-label={dict.contextMenu.ariaLabel}
      >
        <TripleDotsIcon fill={Utils.saturateColor(folder.color, 0.2)} />
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
      <FolderDeleter
        folder={folder}
        modalIsOpen={deleteModalIsOpen}
        setModalIsOpen={setDeleteModalIsOpen}
        dict={dict}
      />
      <FolderUpdater
        folder={folder}
        modalIsOpen={updateModalIsOpen}
        setModalIsOpen={setUpdateModalIsOpen}
        dict={dict}
      />
    </>
  );
};

export default FolderController;
