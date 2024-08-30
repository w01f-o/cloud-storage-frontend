import { Metadata, NextPage } from "next";
import Help from "@/components/pages/help/Help";
import { getDictionary } from "@/actions/lang.action";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: `${dict.pages.help} - Cloud Storage`,
  };
}

const Page: NextPage = () => {
  return <Help />;
};

export default Page;
