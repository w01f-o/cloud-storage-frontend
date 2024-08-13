import { FC } from "react";
import LogoutIcon from "@/components/shared/Icons/LogoutIcon/LogoutIcon";
import styles from "./signOutButton.module.scss";
import { signOutAction } from "@/actions/auth";
import { auth } from "@/services/auth/auth";

const SignOutButton: FC = async () => {
  const session = await auth();

  return session ? (
    <form action={signOutAction}>
      <button className={styles.button} title="Выйти" type="submit">
        <LogoutIcon />
        Выйти
      </button>
    </form>
  ) : (
    <div style={{ height: 30 }}></div>
  );
};

export default SignOutButton;
