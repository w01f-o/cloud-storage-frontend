import { FC } from "react";
import Field from "@/components/shared/UI/Field/Field";
import { signInAction } from "@/actions/auth.actions";

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
    </>
  );
};

export default Login;
