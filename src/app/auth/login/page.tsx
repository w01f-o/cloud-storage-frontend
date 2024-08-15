import { Metadata, NextPage } from "next";
import SignIn from "@/components/pages/auth/signIn/SignIn";

export const metadata: Metadata = { title: "Вход - Cloud Storage" };

const Page: NextPage = () => {
  return <SignIn />;
};

export default Page;
