import { Metadata, NextPage } from "next";
import Help from "@/components/pages/help/Help";

export const metadata: Metadata = { title: "Помощь - Cloud Storage" };

const Page: NextPage = () => {
  return <Help />;
};

export default Page;
