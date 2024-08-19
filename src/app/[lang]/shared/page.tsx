import { Metadata, NextPage } from "next";
import Shared from "@/components/pages/shared/Shared";
import { getDictionary } from "@/actions/lang.action";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: `${dict.pages.shared} - Cloud Storage`,
  };
}

const Page: NextPage = () => {
  return <Shared />;
};

export default Page;
