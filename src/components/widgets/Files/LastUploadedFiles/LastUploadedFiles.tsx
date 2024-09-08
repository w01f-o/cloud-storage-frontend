import { FC } from "react";
import { FilesApi } from "@/services/api/index.api";
import File from "@/components/entities/File/File";
import Link from "next/link";
import { Col } from "@w01f-o/react-grid-layout";
import styles from "./lastUploadedFiles.module.scss";

interface LastUploadedFilesProps {}

const LastUploadedFiles: FC<LastUploadedFilesProps> = async ({}) => {
  const { data: files } = await FilesApi.getLastUploaded();

  return (
    <>
      {!!files.length ? (
        files.map((file) => (
          <Col xs={12} key={file.id}>
            <Link href={`/folder/${file.folderId}`}>
              <File file={file} isExtended={false} />
            </Link>
          </Col>
        ))
      ) : (
        <div className={styles.empty}>Здесь пока ничего нет</div>
      )}
    </>
  );
};

export default LastUploadedFiles;
