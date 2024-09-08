"use client";

import { Lock, Mail, User } from "lucide-react";
import styles from "./authForm.module.scss";
import Link from "next/link";
import { loginAction, registerAction } from "@/actions/auth.actions";
import Field from "@/components/shared/UI/Field/Field";
import Button from "@/components/shared/UI/Button/Button";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { AuthFormDto } from "@/types/dtos/authForm.dto";
import { RootDictionary } from "@/types/dictionaries.type";
import { useSubmit } from "@/hooks/useSubmit";

interface AuthFormProps {
  formType: "registration" | "login";
  dict: RootDictionary;
}

const AuthForm: FC<AuthFormProps> = ({ formType, dict }) => {
  const formAction = formType === "login" ? loginAction : registerAction;
  const formTitle =
    formType === "login" ? dict.auth.login : dict.auth.registration;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormDto>();

  const { submitHandler, isPending } = useSubmit(formAction, {
    successMessage: dict.auth.success,
    errorMessage: (error) =>
      dict.errors[JSON.parse(error).type as keyof RootDictionary["errors"]],
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <h1>{formTitle}</h1>
      {formType === "registration" && (
        <>
          <Field
            icon={{ element: <User />, position: "left" }}
            placeholder={dict.auth.name}
            type="text"
            {...register("name", {
              required: dict.auth.required,
            })}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <div className={styles.error}>{errors.name.message}</div>
          )}
        </>
      )}
      <>
        <Field
          icon={{ element: <Mail />, position: "left" }}
          placeholder={dict.auth.email}
          type="email"
          {...register("email", {
            required: dict.auth.required,
          })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <div className={styles.error}>{errors.email.message}</div>
        )}
        <Field
          icon={{ element: <Lock />, position: "left" }}
          placeholder={dict.auth.password}
          type="password"
          {...register("password", {
            required: dict.auth.required,
            minLength: {
              value: 8,
              message: dict.auth.passwordMinLength,
            },
            maxLength: {
              value: 16,
              message: dict.auth.passwordMaxLength,
            },
            pattern: {
              value: /^\S+$/,
              message: dict.auth.passwordPattern,
            },
          })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <div className={styles.error}>{errors.password.message}</div>
        )}
      </>
      <p>
        {formType === "login"
          ? dict.auth.dontHaveAccount
          : dict.auth.alreadyHaveAccount}
        <Link href={`/auth/${formType === "login" ? "registration" : "login"}`}>
          &nbsp;
          {formType === "login" ? dict.auth.register : dict.auth.login}
        </Link>
      </p>
      <Button
        type="submit"
        title={formTitle}
        role="primary"
        isPending={isPending}
      >
        {formTitle}
      </Button>
    </form>
  );
};

export default AuthForm;
