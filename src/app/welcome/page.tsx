import { Metadata, NextPage } from "next";
import Welcome from "@/components/pages/welcome/Welcome";

export const metadata: Metadata = {
  title: "Добро пожаловать - Cloud Storage",
};

const Page: NextPage = () => {
  return <Welcome />;
};

export default Page;
