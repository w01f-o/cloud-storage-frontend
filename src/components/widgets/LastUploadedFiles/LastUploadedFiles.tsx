import { FC } from "react";
import { FilesApi } from "@/services/api/index.api";
import File from "@/components/entities/File/File";
import { getDictionary } from "@/actions/lang.action";
import Link from "next/link";
import { Col } from "@w01f-o/react-grid-layout";

interface LastUploadedFilesProps {}

const LastUploadedFiles: FC<LastUploadedFilesProps> = async ({}) => {
  const { data: files } = await FilesApi.getLastUploaded();
  const dict = await getDictionary();

  return (
    <>
      {files.length &&
        files.map((file) => (
          <Col xs={12} key={file.id}>
            <Link href={`/folder/${file.folderId}`}>
              <File file={file} dict={dict} extended={false} />
            </Link>
          </Col>
        ))}
    </>
  );
};

export default LastUploadedFiles;
