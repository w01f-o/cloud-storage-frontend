import { Metadata, NextPage } from "next";
import { SharedFilesApi } from "@/services/api/index.api";
import SharedFile from "@/components/entities/SharedFile/SharedFile";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    link: string;
  };
}

export async function generateMetadata({
  params: { link },
}: PageProps): Promise<Metadata> {
  const { data: file } = await SharedFilesApi.getByLink(link);

  return {
    title: `${file.name} - Cloud Storage`,
  };
}

const Page: NextPage<PageProps> = async ({ params: { link } }) => {
  const { data: file, response } = await SharedFilesApi.getByLink(link);

  if (!response.ok) {
    redirect("/");
  }

  return <SharedFile file={file} link={link} />;
};

export default Page;
