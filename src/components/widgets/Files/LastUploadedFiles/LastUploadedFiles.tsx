import { FC } from "react";
import { FilesApi } from "@/services/api/index.api";
import File from "@/components/entities/File/File";
import Link from "next/link";
import { Col } from "@w01f-o/react-grid-layout";
import styles from "./lastUploadedFiles.module.scss";
import { getDictionary } from "@/actions/lang.action";
import { RoutePaths } from "@/enums/RoutePaths.enum";

interface LastUploadedFilesProps {}

const LastUploadedFiles: FC<LastUploadedFilesProps> = async ({}) => {
  const { data: files } = await FilesApi.getLastUploaded();
  const dict = await getDictionary();

  return (
    <>
      {!!files.length ? (
        files.map((file) => (
          <Col xs={12} key={file.id}>
            <Link href={`${RoutePaths.FOLDER}/${file.folderId}`}>
              <File file={file} isExtended={false} />
            </Link>
          </Col>
        ))
      ) : (
        <div className={styles.empty}>{dict.files.empty.title}</div>
      )}
    </>
  );
};

export default LastUploadedFiles;
