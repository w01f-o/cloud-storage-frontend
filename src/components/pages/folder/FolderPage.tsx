import { FoldersApi } from "@/services/api/index.api";
import { FC, Suspense } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import FilesListLoader from "@/components/widgets/Loaders/FilesListLoader/FilesListLoader";
import FilesList from "@/components/widgets/FilesList/FilesList";
import { QueryParams } from "@/types/queryParams.type";

interface FolderPageProps {
  id: string;
  params: QueryParams;
}

const FolderPage: FC<FolderPageProps> = async ({ id, params }) => {
  const { data: folder } = await FoldersApi.getById(id);

  return (
    <>
      <PageTitle>{folder.name}</PageTitle>
      <Suspense
        key={JSON.stringify(params)}
        fallback={<FilesListLoader length={15} />}
      >
        <FilesList folderId={folder.id} />
      </Suspense>
    </>
  );
};

export default FolderPage;
