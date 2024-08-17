import { Metadata, NextPage } from "next";
import Welcome from "@/components/pages/welcome/Welcome";
import { auth } from "@/services/auth/auth";
import { redirect } from "next/navigation";
import { getDictionary } from "@/actions/lang.action";

export const metadata: Metadata = {
  title: "Добро пожаловать - Cloud Storage",
};

const Page: NextPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  const dict = await getDictionary();

  return <Welcome dict={dict} />;
};

export default Page;
