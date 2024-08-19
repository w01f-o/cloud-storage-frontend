import { Metadata, NextPage } from "next";
import Storage from "@/components/pages/storage/Storage";
import { getDictionary } from "@/actions/lang.action";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: `${dict.pages.storage} - Cloud Storage`,
  };
}

const Page: NextPage = () => {
  return <Storage />;
};

export default Page;
