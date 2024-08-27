import { Metadata, NextPage } from "next";
import { getDictionary } from "@/actions/lang.action";
import Auth from "@/components/pages/auth/Auth";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: `${dict.pages.login} - Cloud Storage`,
  };
}

const Page: NextPage = () => {
  return <Auth type="login" />;
};

export default Page;
