import { FC } from "react";
import { FilesApi, FoldersApi } from "@/services/api/index.api";
import FileUploader from "@/components/features/Files/FileUploader/FileUploader";
import File from "@/components/entities/File/File";
import { Col } from "@w01f-o/react-grid-layout";
import { getDictionary } from "@/actions/lang.action";

interface FilesListProps {
  folderId: string;
}

const FilesList: FC<FilesListProps> = async ({ folderId }) => {
  const { data: files } = await FilesApi.getAll(folderId);
  const {
    data: { color },
  } = await FoldersApi.getById(folderId);
  const dict = await getDictionary();

  return (
    <>
      {!files.length && (
        <div>Здесь пока пусто. Хотите загрузить новый файл?</div>
      )}
      {!!files.length &&
        files.map((file) => (
          <Col xs={2} key={file.id}>
            <File file={file} dict={dict} color={color} />
          </Col>
        ))}
      <FileUploader folderId={folderId} />
    </>
  );
};

export default FilesList;
