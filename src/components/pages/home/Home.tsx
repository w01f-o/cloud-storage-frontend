import { FC } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { getDictionary } from "@/actions/lang.action";
import { FoldersApi } from "@/services/folders.api";
import Folder from "@/components/entities/Folder/Folder";
import { auth } from "@/services/auth/auth";

const Home: FC = async () => {
  const dict = await getDictionary();
  const { data: folders } = await FoldersApi.getAll();
  // console.log(folders);
  Array.from({ length: 5 }).map(async () => {
    const session = await auth();
  });
  return (
    <>
      <PageTitle>{dict.pages.home}</PageTitle>
      {/*{folders.map((folder) => (*/}
      {/*  <Folder folder={folder} key={folder.id} />*/}
      {/*))}*/}
    </>
  );
};

export default Home;
