import { FoldersApi } from "@/services/api/index.api";
import { FC } from "react";

interface FolderPageProps {
  id: string;
}

const FolderPage: FC<FolderPageProps> = async ({ id }) => {
  const { data: folder } = await FoldersApi.getById(id);

  return <div>{JSON.stringify(folder)}</div>;
};

export default FolderPage;
