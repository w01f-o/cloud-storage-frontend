import { FC } from "react";
import styles from "./sidebar.module.scss";
import NavBar from "@/components/widgets/NavBar/NavBar";
import SignOutButton from "@/components/features/SignOutButton/SignOutButton";
import CurrentUser from "@/components/widgets/CurrentUser/CurrentUser";

const SideBar: FC = () => {
  return (
    <aside className={styles.sidebar}>
      <CurrentUser />
      <NavBar />
      <SignOutButton />
    </aside>
  );
};

export default SideBar;
