"use client";

import { FC, useState } from "react";
import { RootDictionary } from "@/types/dictionaries.type";
import Button from "@/components/shared/UI/Button/Button";
import Modal from "@/components/shared/UI/Modal/Modal";
import Field from "@/components/shared/UI/Field/Field";
import { useForm } from "react-hook-form";
import { useSubmit } from "@/hooks/useSubmit";
import { updatePasswordAction } from "@/actions/users.action";
import styles from "./passwordChanger.module.scss";
import Form from "@/components/shared/UI/Form/Form";

interface ChangePasswordProps {
  dict: RootDictionary;
}

interface FormState {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

const PasswordChanger: FC<ChangePasswordProps> = ({ dict }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const clickHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormState>();

  const { isPending, submitHandler } = useSubmit<FormState>(
    (data) => {
      return updatePasswordAction({
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
      });
    },
    {
      successMessage: dict.settings.password.success,
      reset,
      errorMessage: (error) =>
        dict.errors[JSON.parse(error).type as keyof RootDictionary["errors"]] ??
        dict.settings.password.error,
      events: {
        onSuccess: () => setModalIsOpen(false),
      },
    },
  );

  return (
    <>
      <Button
        role="secondary"
        title={dict.settings.password.full}
        type="button"
        onClick={clickHandler}
      >
        {dict.settings.password.full}
      </Button>
      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        onClose={reset}
        contentClassName={styles.modal}
      >
        <Form
          onSubmit={handleSubmit(submitHandler)}
          title={dict.settings.password.title}
          className={styles.form}
        >
          <span>
            {dict.settings.password.current}:
            <Field
              {...register("oldPassword", {
                required: {
                  value: true,
                  message: dict.auth.required,
                },
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
              type="password"
              autoFocus
              aria-invalid={errors?.oldPassword ? "true" : "false"}
            />
            <div className={styles.error}>{errors?.oldPassword?.message}</div>
          </span>
          <span>
            {dict.settings.password.new}:
            <Field
              {...register("newPassword", {
                required: {
                  value: true,
                  message: dict.auth.required,
                },
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
              type="password"
              aria-invalid={errors?.newPassword ? "true" : "false"}
            />
            <div className={styles.error}>{errors?.newPassword?.message}</div>
          </span>
          <span>
            {dict.settings.password.repeat}:
            <Field
              {...register("repeatNewPassword", {
                required: {
                  value: true,
                  message: dict.auth.required,
                },
                validate: (value) =>
                  value === watch("newPassword") || "Passwords don't match",
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
              type="password"
              aria-invalid={errors?.repeatNewPassword ? "true" : "false"}
            />
            <div className={styles.error}>
              {errors?.repeatNewPassword?.message}
            </div>
          </span>
          <Button
            type={"submit"}
            role={"primary"}
            title={dict.settings.password.full}
            isPending={isPending}
          >
            {dict.settings.password.partial}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default PasswordChanger;
