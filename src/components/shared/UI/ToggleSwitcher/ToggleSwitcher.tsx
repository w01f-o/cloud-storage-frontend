import { FC, forwardRef, InputHTMLAttributes } from "react";
import styles from "./toggleSwitcher.module.scss";

interface ToggleSwitcherProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

const ToggleSwitcher: FC<ToggleSwitcherProps> = forwardRef<
  HTMLInputElement,
  ToggleSwitcherProps
>(({ ...props }, ref) => {
  return (
    <label className={styles.switcher}>
      <input
        type="checkbox"
        className={styles.input}
        {...props}
        hidden
        ref={ref}
      />
      <span className={styles.slider}></span>
    </label>
  );
});

ToggleSwitcher.displayName = "ToggleSwitcher";

export default ToggleSwitcher;
