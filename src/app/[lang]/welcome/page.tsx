import { Metadata, NextPage } from "next";
import Welcome from "@/components/pages/welcome/Welcome";
import { getDictionary } from "@/dictionaries/dictionaries";
import { cookies } from "next/headers";
import { auth } from "@/services/auth/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Добро пожаловать - Cloud Storage",
};

const Page: NextPage = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  const cookie = cookies();
  const dict = await getDictionary(cookie.get("NEXT_LOCALE")?.value as string);

  return <Welcome dict={dict} />;
};

export default Page;
