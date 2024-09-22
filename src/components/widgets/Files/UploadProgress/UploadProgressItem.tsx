import { FC } from "react";
import { UploadedFile } from "@/types/uploadedFile";
import styles from "./uploadProgress.module.scss";

interface UploadProgressItemProps {
  file: UploadedFile;
}

const UploadProgressItem: FC<UploadProgressItemProps> = ({ file }) => {
  return (
    <div className={styles.file}>
      <div className={styles.name}>{file.name}</div>
      <div className={styles.line}>
        <div
          className={styles.progress}
          style={{ width: `${file.progress * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default UploadProgressItem;
