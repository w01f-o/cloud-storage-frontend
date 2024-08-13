import { Metadata, NextPage } from "next";
import Registration from "@/components/pages/auth/registration/Registration";

export const metadata: Metadata = { title: "Регистрация - Cloud Storage" };

const Page: NextPage = () => {
  return <Registration />;
};

export default Page;
