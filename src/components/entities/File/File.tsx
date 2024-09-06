import { FC } from "react";
import { File as FileType } from "@/types/file.type";
import styles from "./file.module.scss";
import { Utils } from "@/services/utils";
import FileIcon from "@/components/shared/Icons/FileIcon/FileIcon";
import clsx from "clsx";
import FileController from "@/components/features/Files/FileController/FileController";
import { getDictionary } from "@/actions/lang.action";

interface FileProps {
  file: FileType;
  extended: boolean;
}

const File: FC<FileProps> = async ({ file, extended }) => {
  const dict = await getDictionary();

  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.minify]: !extended,
      })}
    >
      <FileIcon fileType={file.type} />
      {extended ? (
        <>
          <div className={styles.name}>{file.name}</div>
          <div className={styles.info}>
            <div className={styles.date}>
              {Utils.getDate(file.addedAt, dict)}
            </div>
            <div className={styles.size}>
              {Utils.formatBytes(file.size, dict)}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.info}>
            <div className={styles.name}>{file.name}</div>
            <div className={styles.date}>
              {Utils.getDate(file.addedAt, dict)}
            </div>
          </div>
          <div className={styles.size}>
            {Utils.formatBytes(file.size, dict)}
          </div>
        </>
      )}
      {extended && <FileController file={file} dict={dict} />}
    </div>
  );
};

export default File;
