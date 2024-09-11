import { FC } from "react";
import { File as FileType } from "@/types/entities/file.type";
import styles from "./file.module.scss";
import { Utils } from "@/services/utils";
import FileIcon from "@/components/shared/Icons/FileIcon/FileIcon";
import clsx from "clsx";
import FileController from "@/components/features/Files/FileController/FileController";
import { getDictionary } from "@/actions/lang.action";
import { isMobileDevice } from "@/actions/actions.utils";
import DesktopOnly from "@/components/features/Responsive/DesktopOnly";

interface FileProps {
  file: FileType;
  isExtended: boolean;
}

const File: FC<FileProps> = async ({ file, isExtended }) => {
  const dict = await getDictionary();
  const isMobile = isMobileDevice();

  return (
    <article
      className={clsx(styles.wrapper, {
        [styles.minify]: !isExtended,
      })}
    >
      <FileIcon fileType={file.type} />
      {isExtended ? (
        <>
          <div className={styles.name}>{file.name}</div>
          <DesktopOnly>
            <div className={styles.info}>
              <time className={styles.date}>
                {Utils.getDate(file.addedAt, dict)}
              </time>
              <div className={styles.size}>
                {Utils.formatBytes(file.size, dict)}
              </div>
            </div>
          </DesktopOnly>
        </>
      ) : (
        <>
          <div className={styles.info}>
            <div className={styles.name}>{file.name}</div>
            <time className={styles.date}>
              {Utils.getDate(file.addedAt, dict)}
            </time>
          </div>
          <div className={styles.size}>
            {Utils.formatBytes(file.size, dict)}
          </div>
        </>
      )}
      {isExtended && (
        <FileController file={file} dict={dict} isMobile={isMobile} />
      )}
    </article>
  );
};

export default File;
