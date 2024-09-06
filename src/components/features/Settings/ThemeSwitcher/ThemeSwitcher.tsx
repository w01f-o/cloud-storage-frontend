"use client";

import { ChangeEvent, FC } from "react";
import ToggleSwitcher from "@/components/shared/UI/ToggleSwitcher/ToggleSwitcher";
import { RootDictionary } from "@/types/dictionaries.type";
import { useTheme } from "@/hooks/useTheme";
import styles from "./themeSwitcher.module.scss";

interface ThemeSwitcherProps {
  dict: RootDictionary;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ dict }) => {
  const theme = useTheme();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? theme.set("dark") : theme.set("light");
  };

  return (
    <div className={styles.wrapper}>
      <div>Тёмная тема:</div>
      <ToggleSwitcher
        onChange={changeHandler}
        checked={theme.current === "dark"}
      />
    </div>
  );
};

export default ThemeSwitcher;
