import { FC } from "react";
import { auth } from "@/services/auth/auth";

const Profile: FC = async () => {
  const session = await auth();

  return <div>{session?.user.name}</div>;
};

export default Profile;
