import { Metadata, NextPage } from "next";
import { SharedFilesApi } from "@/services/api/index.api";
import SharedFile from "@/components/entities/SharedFile/SharedFile";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    link: string;
  };
}

export async function generateMetadata({
  params: { link },
}: PageProps): Promise<Metadata> {
  try {
    const { data: file, response } = await SharedFilesApi.getByLink(link);

    if (!response.ok) {
      notFound();
    }

    return {
      title: `${file.name} - Cloud Storage`,
    };
  } catch (e) {
    notFound();
  }
}

const Page: NextPage<PageProps> = async ({ params: { link } }) => {
  const { data: file } = await SharedFilesApi.getByLink(link);

  return <SharedFile file={file} link={link} />;
};

export default Page;
