"use client";

import { FC } from "react";
import { File } from "@/types/entities/file.type";
import styles from "./sharedFile.module.scss";
import FileIcon from "@/components/shared/Icons/FileIcon/FileIcon";
import { Utils } from "@/services/utils";
import Button from "@/components/shared/UI/Button/Button";
import { RootDictionary } from "@/types/dictionaries.type";
import { useRouter } from "next/navigation";

interface SharedFileProps {
  file: File;
  link: string;
  dict: RootDictionary;
}

const SharedFile: FC<SharedFileProps> = ({ file, dict, link }) => {
  const router = useRouter();

  const clickHandler = (): void => {
    router.replace(`/api/shared_file/${link}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <FileIcon fileType={file.type} />
      </div>
      <div className={styles.name}>{file.name}</div>
      <div className={styles.info}>
        <div className={styles.size}>{Utils.formatBytes(file.size, dict)}</div>
      </div>
      <Button
        type={"button"}
        role={"primary"}
        title={dict.files.actions.download}
        onClick={clickHandler}
      >
        {dict.files.actions.download}
      </Button>
    </div>
  );
};

export default SharedFile;
