import { FC } from "react";
import { auth } from "@/services/auth/auth";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { cookies } from "next/headers";
import { getDictionary } from "@/dictionaries/dictionaries";

const Profile: FC = async () => {
  const session = await auth();
  const cookie = cookies();
  const dict = await getDictionary(cookie.get("NEXT_LOCALE")?.value as string);

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
      <PageTitle>{dict.pages.profile}</PageTitle>
      {devInfo().map((el) => (
        <div key={el.key} style={{ fontSize: 20, marginTop: 6 }}>
          {el.key}: {el.value}
        </div>
      ))}
    </div>
  );
};

export default Profile;
