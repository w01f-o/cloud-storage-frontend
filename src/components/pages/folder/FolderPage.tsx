import { FoldersApi } from "@/services/api/index.api";
import { FC, Suspense } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import FilesListLoader from "@/components/widgets/Loaders/FilesListLoader/FilesListLoader";
import FilesList from "@/components/widgets/FilesList/FilesList";

interface FolderPageProps {
  id: string;
}

const FolderPage: FC<FolderPageProps> = async ({ id }) => {
  const { data: folder } = await FoldersApi.getById(id);

  return (
    <>
      <PageTitle>{folder.name}</PageTitle>
      <Suspense fallback={<FilesListLoader />}>
        <FilesList folderId={folder.id} />
      </Suspense>
    </>
  );
};

export default FolderPage;
