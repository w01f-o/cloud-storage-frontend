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
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthFormDto } from "@/types/dtos/authFormDto.type";
import FormError from "@/components/features/Forms/FormError/FormError";
import { Errors } from "@/services/errors";
import { useParams } from "next/navigation";
import { RootDictionary } from "@/types/dictionaries.type";
import { useToast } from "@/hooks/useToast";

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
  const toast = useToast();
  const [formIsPending, setFormIsPending] = useState<boolean>(false);
  const { lang } = useParams();

  const submitHandler: SubmitHandler<AuthFormDto> = async (data) => {
    setFormIsPending(true);
    const result = await formAction(data);
    setFormIsPending(false);

    if (!result) {
      return;
    }

    if (!result.success) {
      const error = JSON.parse(result.error);

      toast.add({
        type: "error",
        message: Errors.generateError(error.type),
      });
    } else {
      toast.add({ type: "success", message: "Вы успешно авторизовались" });

      await redirectAction(`/${lang}`);
    }
  };

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
          {errors.name && <FormError message={errors.name.message as string} />}
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
        {errors.email && <FormError message={errors.email.message as string} />}
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
          <FormError message={errors.password.message as string} />
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
        isPending={formIsPending}
      >
        {formTitle}
      </Button>
    </form>
  );
};

export default AuthForm;
