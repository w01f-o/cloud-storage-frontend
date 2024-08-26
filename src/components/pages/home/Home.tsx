import { FC } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { getDictionary } from "@/actions/lang.action";
import { FoldersApi } from "@/services/folders.api";

const Home: FC = async () => {
  const dict = await getDictionary();
  const { data: folders } = await FoldersApi.getAll();
  console.log(folders);

  return (
    <>
      <PageTitle>{dict.pages.home}</PageTitle>
    </>
  );
};

export default Home;
