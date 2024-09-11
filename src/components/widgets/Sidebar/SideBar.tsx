import { FC } from "react";
import styles from "./sidebar.module.scss";
import NavBar from "@/components/widgets/NavBar/NavBar";
import SignOutButton from "@/components/features/Auth/SignOutButton/SignOutButton";
import CurrentUser from "@/components/widgets/User/CurrentUser/CurrentUser";
import { auth } from "@/services/auth/auth";
import { getDictionary } from "@/actions/lang.action";

const SideBar: FC = async () => {
  const session = await auth();
  const dict = await getDictionary();

  return (
    <aside className={styles.sidebar}>
      <CurrentUser dict={dict} />
      <NavBar dict={dict} />
      {session ? <SignOutButton /> : <div style={{ height: 30 }}></div>}
    </aside>
  );
};

export default SideBar;
