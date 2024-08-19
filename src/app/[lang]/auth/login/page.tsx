import { Metadata, NextPage } from "next";
import Login from "@/components/pages/auth/Login/Login";
import { getDictionary } from "@/actions/lang.action";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: `${dict.pages.login} - Cloud Storage`,
  };
}

const Page: NextPage = () => {
  return <Login />;
};

export default Page;
