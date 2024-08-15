"use client";

import { Lock, Mail, User } from "lucide-react";
import styles from "./AuthForm.module.scss";
import Link from "next/link";
import { loginAction, registerAction } from "@/actions/auth.actions";
import Field from "@/components/shared/UI/Field/Field";
import Button from "@/components/shared/UI/Button/Button";
import { FC, FormEvent, useState } from "react";

interface AuthFormProps {
  formType: "registration" | "login";
}

const AuthForm: FC<AuthFormProps> = ({ formType }) => {
  const formAction = formType === "login" ? loginAction : registerAction;

  const formTitle = formType === "login" ? "Войти" : "Зарегистрироваться";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | string>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await formAction(formData);
    } catch (err) {
      //@ts-ignore
      const error = JSON.parse(err.message).data.message;
      setError(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>{formTitle}</h1>
      {formType === "registration" && (
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
          &nbsp;{formType === "login" ? "Зарегистрироваться" : "Войти"}
        </Link>
      </p>
      <Button
        type="submit"
        title={formTitle}
        role="primary"
        isPending={isLoading}
      >
        {formTitle}
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default AuthForm;
