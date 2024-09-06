import { Metadata, NextPage } from "next";
import { SharedFilesApi } from "@/services/api/index.api";
import SharedFile from "@/components/entities/SharedFile/SharedFile";
import { getDictionary } from "@/actions/lang.action";

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
  const { data: file } = await SharedFilesApi.getByLink(link);
  const dict = await getDictionary();

  return <SharedFile file={file} dict={dict} link={link} />;
};

export default Page;
