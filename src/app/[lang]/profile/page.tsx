import { Metadata, NextPage } from "next";
import Profile from "@/components/pages/profile/Profile";
import { getDictionary } from "@/actions/lang.action";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: `${dict.pages.profile} - Cloud Storage`,
  };
}

const Page: NextPage = () => {
  return <Profile />;
};

export default Page;
