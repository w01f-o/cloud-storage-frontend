import { FC } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { cookies } from "next/headers";
import { getDictionary } from "@/dictionaries/dictionaries";

const Home: FC = async () => {
  const cookie = cookies();
  const dict = await getDictionary(cookie.get("NEXT_LOCALE")?.value as string);

  return (
    <>
      <PageTitle>{dict.pages.home}</PageTitle>
    </>
  );
};

export default Home;
