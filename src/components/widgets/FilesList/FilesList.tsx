import { FC } from "react";
import { FilesApi } from "@/services/api/index.api";
import FileUploader from "@/components/features/Files/FileUploader/FileUploader";
import File from "@/components/entities/File/File";

interface FilesListProps {
  folderId: string;
}

const FilesList: FC<FilesListProps> = async ({ folderId }) => {
  const { data: files } = await FilesApi.getAll(folderId);

  return (
    <>
      {!files.length && <FileUploader folderId={folderId} />}
      {files.map((file) => (
        <File key={file.id} file={file} />
      ))}
    </>
  );
};

export default FilesList;
