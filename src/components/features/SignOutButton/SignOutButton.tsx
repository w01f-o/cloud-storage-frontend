"use client";

import { FC } from "react";
import LogoutIcon from "@/components/shared/Icons/LogoutIcon";
import styles from "./signOutButton.module.scss";
import { logoutAction, redirectAction } from "@/actions/auth.actions";
import { useParams } from "next/navigation";
import { RootDictionary } from "@/types/dictionaries.type";

interface SignOutButtonProps {
  dict: RootDictionary;
}

const SignOutButton: FC<SignOutButtonProps> = ({ dict }) => {
  const { lang } = useParams();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    await logoutAction();
    await redirectAction(`/${lang}/welcome`);
  };

  return (
    <form onSubmit={submitHandler}>
      <button className={styles.button} title="Выйти" type="submit">
        <LogoutIcon />
        {dict.auth.logout}
      </button>
    </form>
  );
};

export default SignOutButton;
