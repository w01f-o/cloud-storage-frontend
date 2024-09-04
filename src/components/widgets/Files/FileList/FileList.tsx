import { FC } from "react";
import { FilesApi } from "@/services/api/index.api";
import FileUploader from "@/components/features/Files/FileUploader/FileUploader";
import File from "@/components/entities/File/File";
import { Col } from "@w01f-o/react-grid-layout";
import { getDictionary } from "@/actions/lang.action";
import styles from "@/components/pages/folder/folderPage.module.scss";

interface FileListProps {
  folderId: string;
}

const FileList: FC<FileListProps> = async ({ folderId }) => {
  const { data: files } = await FilesApi.getAll(folderId);
  const dict = await getDictionary();

  return (
    <>
      {!files.length && (
        <div className={styles.empty}>{dict.files.empty.title}</div>
      )}
      {!!files.length &&
        files.map((file) => (
          <Col xs={12} key={file.id}>
            <File file={file} dict={dict} extended />
          </Col>
        ))}
      <Col xs={12}>
        <FileUploader folderId={folderId} dict={dict} />
      </Col>
    </>
  );
};

export default FileList;
