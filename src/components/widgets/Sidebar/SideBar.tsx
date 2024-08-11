import { FC } from "react";
import styles from "./sidebar.module.scss";
import NavBar from "../NavBar/NavBar";

const SideBar: FC = () => {
  return (
    <aside className={styles.sidebar}>
      <NavBar />
    </aside>
  );
};

export default SideBar;
