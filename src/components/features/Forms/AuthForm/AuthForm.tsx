import { Lock, Mail, User } from "lucide-react";
import styles from "./AuthForm.module.scss";
import Link from "next/link";
import { loginAction, registerAction } from "@/actions/auth.actions";
import Field from "@/components/shared/UI/Field/Field";
import Button from "@/components/shared/UI/Button/Button";
import { FC } from "react";

interface AuthFormProps {
  formType: "register" | "login";
}

const AuthForm: FC<AuthFormProps> = ({ formType }) => {
  const formAction = formType === "login" ? loginAction : registerAction;

  const formTitle = formType === "login" ? "Войти" : "Зарегистрироваться";

  return (
    <form action={formAction} className={styles.form}>
      <h1>{formTitle}</h1>
      {formType === "register" && (
        <Field
          icon={{ element: <User />, position: "left" }}
          placeholder="Имя"
          name="name"
          type="text"
        />
      )}
      <>
        <Field
          icon={{ element: <Mail />, position: "left" }}
          placeholder="Email"
          name="email"
          type="email"
        />
        <Field
          icon={{ element: <Lock />, position: "left" }}
          placeholder="Пароль"
          name="password"
          type="password"
        />
      </>
      <p>
        {formType === "login" ? "Ещё нет аккаунта?" : "Уже зарегистрированы?"}
        <Link href={`/auth/${formType === "login" ? "registration" : "login"}`}>
          &nbsp;{formTitle}
        </Link>
      </p>
      <Button type="submit" title={formTitle} role="primary">
        {formTitle}
      </Button>
    </form>
  );
};

export default AuthForm;
