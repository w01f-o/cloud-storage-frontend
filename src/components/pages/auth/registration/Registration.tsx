import { FC } from "react";
import { registerAction } from "@/actions/auth.actions";
import Field from "@/components/shared/UI/Field/Field";
import Link from "next/link";

const Registration: FC = () => {
  return (
    <>
      <form action={registerAction}>
        <div>
          Name: <Field placeholder="email" name="name" type="text" />
        </div>
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
        href={"/auth/login"}
        style={{ marginTop: 20, fontSize: 20, display: "block" }}
      >
        Войти
      </Link>
    </>
  );
};

export default Registration;
