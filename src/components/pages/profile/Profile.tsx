import { FC } from "react";
import { auth } from "@/services/auth/auth";
import { redirect } from "next/navigation";

const Profile: FC = async () => {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return <div>{JSON.stringify(session)}</div>;
};

export default Profile;
