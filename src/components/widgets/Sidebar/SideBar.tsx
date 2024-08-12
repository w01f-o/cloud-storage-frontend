import { FC } from "react";
import styles from "./sidebar.module.scss";
import NavBar from "@/components/widgets/NavBar/NavBar";
import LogoutButton from "@/components/features/LogoutButton/LogoutButton";
import CurrentUser from "@/components/widgets/CurrentUser/CurrentUser";

const SideBar: FC = () => {
  return (
    <aside className={styles.sidebar}>
      <CurrentUser />
      <NavBar />
      <LogoutButton />
    </aside>
  );
};

export default SideBar;
