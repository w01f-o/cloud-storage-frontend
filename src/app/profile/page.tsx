import { Metadata, NextPage } from "next";
import Profile from "@/components/pages/profile/Profile";

export const metadata: Metadata = { title: "Профиль" };

const Page: NextPage = () => {
  return <Profile />;
};

export default Page;
