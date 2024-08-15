import { Metadata, NextPage } from "next";
import Login from "@/components/pages/auth/Login/Login";

export const metadata: Metadata = { title: "Вход - Cloud Storage" };

const Page: NextPage = () => {
  return <Login />;
};

export default Page;