import Home from "@/components/pages/home/Home";
import { Metadata, NextPage } from "next";
import { auth } from "@/services/auth/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Главная - Cloud Storage" };

const Page: NextPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("welcome");
  }

  return <Home />;
};

export default Page;
