import Home from "@/components/pages/home/Home";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = { title: "Главная" };

const Page: NextPage = () => {
  return <Home />;
};

export default Page;
