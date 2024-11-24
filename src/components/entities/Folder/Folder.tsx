import { FC } from "react";
import styles from "./folder.module.scss";
import type { Folder } from "@/types/entities/folder.type";
import Link from "next/link";
import FolderIcon from "@/components/shared/Icons/FolderIcon";
import { Utils } from "@/services/utils";
import clsx from "clsx";
import FolderController from "@/components/features/Folders/FolderController/FolderController";
import { getDictionary } from "@/actions/lang.action";
import { isMobileDevice } from "@/actions/actions.utils";

interface FolderProps {
  folder: Folder;
  isExtended?: boolean;
}

const Folder: FC<FolderProps> = async ({ folder, isExtended }) => {
  const dict = await getDictionary();
  const isMobile = isMobileDevice();

  return (
    <article className={styles.wrapper}>
      <Link
        className={clsx(styles.folder, {
          [styles.minify]: !isExtended,
        })}
        style={{ background: folder.color }}
        href={`/folder/${folder.id}`}
      >
        <FolderIcon color={folder.color} className={styles.icon} />
        <div className={styles.info}>
          <div className={styles.name}>{folder.name}</div>
          <time className={styles.date}>
            {Utils.getDate(folder.editedAt, dict)}
          </time>
        </div>
      </Link>
      {isExtended && (
        <FolderController folder={folder} dict={dict} isMobile={isMobile} />
      )}
    </article>
  );
};

export default Folder;
