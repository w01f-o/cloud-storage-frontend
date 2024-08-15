import { FC } from "react";
import { registerAction } from "@/actions/auth.actions";
import Field from "@/components/shared/UI/Field/Field";

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
    </>
  );
};

export default Registration;
