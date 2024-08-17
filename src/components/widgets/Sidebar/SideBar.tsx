import { FC } from "react";
import styles from "./sidebar.module.scss";
import NavBar from "@/components/widgets/NavBar/NavBar";
import SignOutButton from "@/components/features/SignOutButton/SignOutButton";
import CurrentUser from "@/components/widgets/CurrentUser/CurrentUser";
import { auth } from "@/services/auth/auth";
import { getDictionary } from "@/dictionaries/dictionaries";
import { cookies } from "next/headers";

const SideBar: FC = async () => {
  const session = await auth();
  const cookie = cookies();
  const dict = await getDictionary(cookie.get("NEXT_LOCALE")?.value || "en-US");

  return (
    <aside className={styles.sidebar}>
      <CurrentUser dict={dict} />
      <NavBar dict={dict} />
      {session ? (
        <SignOutButton dict={dict} />
      ) : (
        <div style={{ height: 30 }}></div>
      )}
    </aside>
  );
};

export default SideBar;
