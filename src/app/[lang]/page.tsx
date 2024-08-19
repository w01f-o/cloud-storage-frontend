import Home from "@/components/pages/home/Home";
import { Metadata, NextPage } from "next";
import { auth } from "@/services/auth/auth";
import { redirect } from "next/navigation";
import { getDictionary } from "@/actions/lang.action";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: `${dict.pages.home} - Cloud Storage`,
  };
}
const Page: NextPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("welcome");
  }

  return <Home />;
};

export default Page;
