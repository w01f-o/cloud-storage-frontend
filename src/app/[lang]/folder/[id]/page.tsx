import FolderPage from "@/components/pages/folder/FolderPage";
import { NextPage } from "next";

interface PageProps {
  params: {
    id: string;
  };
}

const page: NextPage<PageProps> = ({ params: { id } }) => {
  return <FolderPage id={id} />;
};

export default page;
