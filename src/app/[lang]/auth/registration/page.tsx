import { Metadata, NextPage } from "next";
import Registration from "@/components/pages/auth/Registration/Registration";
import { getDictionary } from "@/actions/lang.action";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: `${dict.pages.registration} - Cloud Storage`,
  };
}
const Page: NextPage = () => {
  return <Registration />;
};

export default Page;
