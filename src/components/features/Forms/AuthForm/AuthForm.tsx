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
import { useAppDispatch } from "@/hooks/redux";
import { addToast } from "@/redux/reducers/toastSlice";
import { Errors } from "@/services/errors";
import { Utils } from "@/services/utils";

interface AuthFormProps {
  formType: "registration" | "login";
}

const AuthForm: FC<AuthFormProps> = ({ formType }) => {
  const formAction = formType === "login" ? loginAction : registerAction;
  const formTitle = formType === "login" ? "Войти" : "Зарегистрироваться";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormDto>();
  const dispatch = useAppDispatch();
  const [formIsPending, setFormIsPending] = useState<boolean>(false);

  const submitHandler: SubmitHandler<AuthFormDto> = async (data) => {
    setFormIsPending(true);
    const result = await formAction(data);
    setFormIsPending(false);

    if (!result) {
      return;
    }

    if (!result.success) {
      const error = JSON.parse(result.error);

      dispatch(
        addToast({
          type: "error",
          message: Errors.generateError(error.type),
        }),
      );
    } else {
      dispatch(
        addToast({ type: "success", message: "Вы успешно авторизовались" }),
      );

      await Utils.sleep(200);
      await redirectAction("/");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <h1>{formTitle}</h1>
      {formType === "registration" && (
        <>
          <Field
            icon={{ element: <User />, position: "left" }}
            placeholder="Имя"
            type="text"
            {...register("name", {
              required: "Поле обязательно для заполнения",
            })}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && <FormError message={errors.name.message as string} />}
        </>
      )}
      <>
        <Field
          icon={{ element: <Mail />, position: "left" }}
          placeholder="Email"
          type="email"
          {...register("email", {
            required: "Поле обязательно для заполнения",
          })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && <FormError message={errors.email.message as string} />}
        <Field
          icon={{ element: <Lock />, position: "left" }}
          placeholder="Пароль"
          type="password"
          {...register("password", {
            required: "Поле обязательно для заполнения",
            minLength: {
              value: 8,
              message: "Пароль должен содержать не менее 8 символов",
            },
            maxLength: {
              value: 16,
              message: "Пароль должен содержать не более 16 символов",
            },
            pattern: {
              value: /^\S+$/,
              message: "Пароль не должен содержать пробелы",
            },
          })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <FormError message={errors.password.message as string} />
        )}
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
        isPending={formIsPending}
      >
        {formTitle}
      </Button>
    </form>
  );
};

export default AuthForm;
