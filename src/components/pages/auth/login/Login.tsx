"use client";

import { FC } from "react";
import Field from "@/components/shared/UI/Field/Field";
import { signInAction } from "@/actions/auth";
import Link from "next/link";

const Login: FC = () => {
  return (
    <>
      <form action={signInAction}>
        <div>
          Email: <Field placeholder="email" name="email" type="email" />
        </div>
        <div>
          Password:
          <Field placeholder="password" name="password" type="password" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link
        href={"/auth/registration"}
        style={{ marginTop: 20, fontSize: 20, display: "block" }}
      >
        Регистрация
      </Link>
    </>
  );
};

export default Login;
