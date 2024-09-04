import { FoldersApi } from "@/services/api/index.api";
import { FC, Suspense } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import FilesListLoader from "@/components/widgets/Loaders/FilesListLoader/FilesListLoader";
import FilesList from "@/components/widgets/Files/FilesList/FilesList";
import { QueryParams } from "@/types/queryParams.type";
import { Row } from "@w01f-o/react-grid-layout";
import styles from "./folderPage.module.scss";

interface FolderPageProps {
  id: string;
  params: QueryParams;
}

const FolderPage: FC<FolderPageProps> = async ({ id, params }) => {
  const { data: folder } = await FoldersApi.getById(id);

  return (
    <>
      <PageTitle>{folder.name}</PageTitle>
      <Row className={styles.row}>
        <Suspense
          key={JSON.stringify(params)}
          fallback={<FilesListLoader length={15} />}
        >
          <FilesList folderId={folder.id} />
        </Suspense>
      </Row>
    </>
  );
};

export default FolderPage;
