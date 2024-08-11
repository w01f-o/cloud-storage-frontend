"use client";

import { FC } from "react";
import LogoutIcon from "@/components/shared/Icons/LogoutIcon/LogoutIcon";
import styles from "./logoutButton.module.scss";

const LogoutButton: FC = () => {
  const clickHandler = () => {};

  return (
    <button
      className={styles.button}
      title="Выйти"
      onClick={clickHandler}
      type="button"
    >
      <LogoutIcon />
      Выйти
    </button>
  );
};

export default LogoutButton;
