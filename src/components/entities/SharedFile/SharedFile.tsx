import { FC } from "react";
import { File } from "@/types/entities/file.type";
import styles from "./sharedFile.module.scss";
import FileIcon from "@/components/shared/Icons/FileIcon/FileIcon";
import { Utils } from "@/services/utils";
import Button from "@/components/shared/UI/Button/Button";
import Link from "next/link";
import { getDictionary } from "@/actions/lang.action";

interface SharedFileProps {
  file: File;
  link: string;
}

const SharedFile: FC<SharedFileProps> = async ({ file, link }) => {
  const dict = await getDictionary();

  return (
    <article className={styles.wrapper}>
      <div className={styles.icon}>
        <FileIcon fileType={file.type} />
      </div>
      <div className={styles.name}>{file.name}</div>
      <div className={styles.info}>
        <div className={styles.size}>{Utils.formatBytes(file.size, dict)}</div>
      </div>
      <Link href={`/download/shared_file/${link}`} target={"_blank"}>
        <Button role={"primary"}>{dict.files.actions.download}</Button>
      </Link>
    </article>
  );
};

export default SharedFile;
