import NotFound from "@/components/pages/NotFound/NotFound";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Страница не найдена - Cloud Storage",
};

const page: NextPage = () => {
  return <NotFound />;
};

export default NotFound;
