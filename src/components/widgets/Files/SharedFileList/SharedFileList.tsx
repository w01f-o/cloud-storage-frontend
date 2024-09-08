import { FC } from "react";
import { Col } from "@w01f-o/react-grid-layout";
import File from "@/components/entities/File/File";
import styles from "./sharedFileList.module.scss";
import { getDictionary } from "@/actions/lang.action";
import { SharedFilesApi } from "@/services/api/index.api";

const SharedFileList: FC = async () => {
  const dict = await getDictionary();
  const { data: files } = await SharedFilesApi.getShared();

  return (
    <>
      {!files.length && (
        <div className={styles.empty}>{dict.files.share.empty}</div>
      )}
      {!!files.length &&
        files.map((file) => (
          <Col xs={12} key={file.id}>
            <File file={file} isExtended />
          </Col>
        ))}
    </>
  );
};

export default SharedFileList;
