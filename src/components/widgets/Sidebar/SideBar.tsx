import { FC } from "react";
import styles from "./sidebar.module.scss";
import NavBar from "@/components/widgets/NavBar/NavBar";
import SignOutButton from "@/components/features/Auth/SignOutButton/SignOutButton";
import CurrentUser from "@/components/widgets/User/CurrentUser/CurrentUser";
import { auth } from "@/services/auth/auth";
import { getDictionary } from "@/actions/lang.action";
import { headers } from "next/headers";
import { isMobileDevice } from "@/actions/actions.utils";

const SideBar: FC = async () => {
  const session = await auth();
  const dict = await getDictionary();
  const isMobile = isMobileDevice();

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
