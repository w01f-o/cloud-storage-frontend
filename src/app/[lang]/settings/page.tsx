import { Metadata, NextPage } from "next";
import Settings from "@/components/pages/settings/Settings";

export const metadata: Metadata = { title: "Настройки - Cloud Storage" };

const Page: NextPage = () => {
  return <Settings />;
};

export default Page;
