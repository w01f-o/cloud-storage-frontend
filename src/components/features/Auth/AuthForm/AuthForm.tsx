"use client";

import { Lock, Mail, User } from "lucide-react";
import styles from "./authForm.module.scss";
import Link from "next/link";
import {
  loginAction,
  redirectAction,
  registerAction,
} from "@/actions/auth.actions";
import Field from "@/components/shared/UI/Field/Field";
import Button from "@/components/shared/UI/Button/Button";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { AuthDto } from "@/types/dtos/auth/auth.dto";
import { RootDictionary } from "@/types/dictionaries.type";
import { useSubmit } from "@/hooks/useSubmit";
import { useParams } from "next/navigation";
import FormFieldError from "@/components/shared/UI/Form/FormFieldError";
import { RoutePaths } from "@/enums/RoutePaths.enum";

interface AuthFormProps {
  formType: "registration" | "login";
  dict: RootDictionary;
}

const AuthForm: FC<AuthFormProps> = ({ formType, dict }) => {
  const formAction = formType === "login" ? loginAction : registerAction;
  const formTitle =
    formType === "login" ? dict.auth.login : dict.auth.registration;
  const { lang } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthDto>();

  const { submitHandler, isPending } = useSubmit(formAction, {
    successMessage: dict.auth.success,
    errorMessage: (error) =>
      dict.errors[JSON.parse(error).type as keyof RootDictionary["errors"]],
    events: {
      onSuccess: async () => {
        await redirectAction(`/${lang}/`);
      },
    },
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
          <FormFieldError errors={errors} field={"name"} />
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
        <FormFieldError errors={errors} field={"email"} />
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
        <FormFieldError errors={errors} field={"password"} />
      </>
      <p>
        {formType === "login"
          ? dict.auth.dontHaveAccount
          : dict.auth.alreadyHaveAccount}
        <Link
          href={
            formType === "login" ? RoutePaths.REGISTRATION : RoutePaths.LOGIN
          }
        >
          &nbsp;
          {formType === "login" ? dict.auth.register : dict.auth.login}
        </Link>
      </p>
      <Button role="primary" isPending={isPending}>
        {formTitle}
      </Button>
    </form>
  );
};

export default AuthForm;
