import FolderPage from "@/components/pages/folder/FolderPage";
import { Metadata, NextPage } from "next";
import { FoldersApi } from "@/services/api/index.api";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  const { data: folder } = await FoldersApi.getById(id);

  return {
    title: `${folder.name} - Cloud Storage`,
  };
}

const page: NextPage<PageProps> = ({ params: { id } }) => {
  return <FolderPage id={id} />;
};

export default page;
