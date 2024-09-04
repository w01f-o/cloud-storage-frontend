import { Metadata, NextPage } from "next";
import Activation from "@/components/pages/activation/Activation";
import { getDictionary } from "@/actions/lang.action";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: `${dict.pages.activation} - Cloud Storage`,
  };
}

const Page: NextPage = () => {
  return <Activation />;
};

export default Page;
