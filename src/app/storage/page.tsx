import { Metadata, NextPage } from "next";
import Storage from "@/components/pages/storage/Storage";

export const metadata: Metadata = { title: "Хранилище - Cloud Storage" };

const Page: NextPage = () => {
  return <Storage />;
};

export default Page;
