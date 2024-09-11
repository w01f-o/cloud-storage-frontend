import { FC, memo } from "react";
import LogoutIcon from "@/components/shared/Icons/LogoutIcon";
import styles from "./signOutButton.module.scss";
import { logoutAction, redirectAction } from "@/actions/auth.actions";
import { getDictionary } from "@/actions/lang.action";

const SignOutButton: FC = async () => {
  const dict = await getDictionary();

  const logout = async (): Promise<void> => {
    "use server";

    await logoutAction();
    await redirectAction("/");
  };

  return (
    <form action={logout}>
      <button className={styles.button}>
        <LogoutIcon />
        {dict.auth.logout}
      </button>
    </form>
  );
};

export default memo(SignOutButton);
