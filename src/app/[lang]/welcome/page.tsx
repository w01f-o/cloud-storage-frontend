import { Metadata, NextPage } from "next";
import Welcome from "@/components/pages/welcome/Welcome";
import { auth } from "@/services/auth/auth";
import { redirect } from "next/navigation";
import { getDictionary } from "@/actions/lang.action";
import { isMobileDevice } from "@/actions/actions.utils";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: `${dict.pages.welcome} - Cloud Storage`,
  };
}

const Page: NextPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  const dict = await getDictionary();
  const isMobile = isMobileDevice();

  return <Welcome dict={dict} isMobile={isMobile} />;
};

export default Page;
