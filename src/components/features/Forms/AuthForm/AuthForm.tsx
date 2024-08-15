import { FC } from "react";
import { registerAction, loginAction } from "@/actions/auth.actions";
import Field from "@/components/shared/UI/Field/Field";
import { Lock, Mail, User } from "lucide-react";
import styles from "./authForm.module.scss";
import Button from "@/components/shared/UI/Button/Button";
import Link from "next/link";

interface AuthFormProps {
  type: "register" | "signIn";
}

const AuthForm: FC<AuthFormProps> = ({ type }) => {
  return type === "signIn" ? (
    <form action={loginAction} className={styles.form}>
      <h1>Войти</h1>
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
      <p>
        Ещё нет аккаунта?
        <Link href="/auth/registration">&nbsp;Зарегистрироваться</Link>
      </p>
      <Button type={"submit"} title={"Войти"} role={"primary"}>
        Войти
      </Button>
    </form>
  ) : (
    <form action={registerAction} className={styles.form}>
      <h1>Зарегистрироваться</h1>
      <Field
        icon={{ element: <User />, position: "left" }}
        placeholder="Имя"
        name="name"
        type="text"
      />
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
      <p>
        Уже зарегистрированы?<Link href="/auth/login">&nbsp;Войти</Link>
      </p>
      <Button type={"submit"} title={"Войти"} role={"primary"}>
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default AuthForm;
