import { Metadata, NextPage } from "next";
import Shared from "@/components/pages/shared/Shared";
import { getDictionary } from "@/actions/lang.action";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: `${dict.pages.shared} - Cloud Storage`,
  };
}

interface NextPageProps {
  searchParams: Record<string, any>;
}

const Page: NextPage<NextPageProps> = ({ searchParams }) => {
  return <Shared searchParams={searchParams} />;
};

export default Page;
