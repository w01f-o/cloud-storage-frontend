import FolderPage from "@/components/pages/folder/FolderPage";
import { Metadata, NextPage } from "next";
import { FoldersApi } from "@/services/api/index.api";
import { QueryParams } from "@/types/queryParams.type";

interface PageProps {
  params: {
    id: string;
  };
  searchParams: QueryParams;
}

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  const { data: folder } = await FoldersApi.getById(id);

  return {
    title: `${folder.name} - Cloud Storage`,
  };
}

const page: NextPage<PageProps> = ({ params: { id }, searchParams }) => {
  return <FolderPage id={id} params={searchParams} />;
};

export default page;
