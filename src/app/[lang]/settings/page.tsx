import { Metadata, NextPage } from "next";
import Settings from "@/components/pages/settings/Settings";
import { getDictionary } from "@/actions/lang.action";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: `${dict.pages.settings} - Cloud Storage`,
  };
}
const Page: NextPage = () => {
  return <Settings />;
};

export default Page;
