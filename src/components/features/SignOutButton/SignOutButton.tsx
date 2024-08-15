import { FC } from "react";
import LogoutIcon from "@/components/shared/Icons/LogoutIcon";
import styles from "./signOutButton.module.scss";
import { signOutAction } from "@/actions/auth.actions";
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
