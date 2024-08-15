import { FC } from "react";
import { auth } from "@/services/auth/auth";

const Profile: FC = async () => {
  const session = await auth();

  const devInfo = () => {
    const array = [];
    for (const key in session!.user) {
      if (session) {
        array.push({
          key,
          //@ts-expect-error
          value: session.user[key],
        });
      }
    }

    return array;
  };

  return (
    <div>
      {devInfo().map((el) => (
        <div key={el.key} style={{ fontSize: 20, marginTop: 6 }}>
          {el.key}: {el.value}
        </div>
      ))}
    </div>
  );
};

export default Profile;
