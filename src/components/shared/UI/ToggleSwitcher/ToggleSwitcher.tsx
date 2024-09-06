import { FC, InputHTMLAttributes } from "react";
import styles from "./toggleSwitcher.module.scss";

interface ToggleSwitcherProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

const ToggleSwitcher: FC<ToggleSwitcherProps> = ({ ...props }) => {
  return (
    <label className={styles.switcher}>
      <input type="checkbox" className={styles.input} {...props} hidden />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleSwitcher;
