import { FC } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { getDictionary } from "@/actions/lang.action";

const Profile: FC = async () => {
  const dict = await getDictionary();

  return (
    <div>
      <PageTitle>{dict.pages.profile}</PageTitle>
    </div>
  );
};

export default Profile;
