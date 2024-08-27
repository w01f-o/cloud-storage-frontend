import { FC } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { getDictionary } from "@/actions/lang.action";
import { FoldersApi } from "@/services/api/index.api";

const Home: FC = async () => {
  const dict = await getDictionary();
  const { data } = await FoldersApi.getAll();
  console.log(data);

  return (
    <>
      <PageTitle>{dict.pages.home}</PageTitle>
    </>
  );
};

export default Home;
