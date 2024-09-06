"use client";

import { FC, useState } from "react";
import Button from "@/components/shared/UI/Button/Button";
import Modal from "@/components/shared/UI/Modal/Modal";
import Field from "@/components/shared/UI/Field/Field";
import { useSubmit } from "@/hooks/useSubmit";
import { useForm } from "react-hook-form";
import { RootDictionary } from "@/types/dictionaries.type";
import { updateEmailAction } from "@/actions/users.action";
import { UpdateEmailDto } from "@/types/dtos/updateEmail.dto";
import styles from "./emailChanger.module.scss";

interface EmailChangerProps {
  dict: RootDictionary;
}

interface FormState {
  email: string;
}

const EmailChanger: FC<EmailChangerProps> = ({ dict }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const clickHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateEmailDto>();
  const { isPending, submitHandler } = useSubmit<UpdateEmailDto>(
    updateEmailAction,
    { successMessage: "", errorMessage: (error) => error },
    {},
  );

  return (
    <>
      <Button
        type={"button"}
        role={"secondary"}
        title={"email"}
        onClick={clickHandler}
      >
        Изменить почту
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
          <h5>Смена почты</h5>
          <Field
            type="email"
            placeholder="Email"
            {...register("email", {
              required: {
                value: true,
                message: dict.auth.required,
              },
            })}
            aria-invalid={errors?.email ? "true" : "false"}
          />
          <div className={styles.error}>{errors?.email?.message}</div>
          <Button
            type={"submit"}
            role={"primary"}
            title={"submit"}
            isPending={isPending}
          >
            Сменить
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EmailChanger;
