import { FC } from "react";
import { FilesApi } from "@/services/api/index.api";
import FileUploader from "@/components/features/Files/FileUploader/FileUploader";
import File from "@/components/entities/File/File";
import { Col, Row } from "@w01f-o/react-grid-layout";
import { getDictionary } from "@/actions/lang.action";
import styles from "@/components/pages/folder/folderPage.module.scss";

interface FilesListProps {
  folderId: string;
}

const FilesList: FC<FilesListProps> = async ({ folderId }) => {
  const { data: files } = await FilesApi.getAll(folderId);
  const dict = await getDictionary();

  return (
    <>
      <Row className={styles.row}>
        {!files.length && (
          <div className={styles.empty}>
            Здесь пока пусто. Хотите загрузить новый файл?
          </div>
        )}
        {!!files.length &&
          files.map((file) => (
            <Col xs={12} key={file.id}>
              <File file={file} dict={dict} extended />
            </Col>
          ))}
      </Row>
      <FileUploader folderId={folderId} />
    </>
  );
};

export default FilesList;
