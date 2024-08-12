import { Metadata, NextPage } from "next";
import Shared from "@/components/pages/shared/Shared";

export const metadata: Metadata = { title: "Общие - Cloud Storage" };

const Page: NextPage = () => {
  return <Shared />;
};

export default Page;
