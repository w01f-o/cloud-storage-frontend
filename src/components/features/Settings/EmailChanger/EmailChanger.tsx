"use client";

import { FC, useState } from "react";
import Button from "@/components/shared/UI/Button/Button";
import Modal from "@/components/shared/UI/Modal/Modal";
import Field from "@/components/shared/UI/Field/Field";
import { useSubmit } from "@/hooks/useSubmit";
import { useForm } from "react-hook-form";
import { RootDictionary } from "@/types/dictionaries.type";
import { updateEmailAction } from "@/actions/users.action";
import { UpdateEmailDto } from "@/types/dtos/users/updateEmail.dto";
import styles from "./emailChanger.module.scss";
import Form from "@/components/shared/UI/Form/Form";
import { useRouter } from "next/navigation";

interface EmailChangerProps {
  dict: RootDictionary;
}

const EmailChanger: FC<EmailChangerProps> = ({ dict }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const router = useRouter();
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
    {
      successMessage: dict.settings.email.success,
      errorMessage: () => dict.settings.email.error,
      events: {
        onEnd: () => {
          setModalIsOpen(false);
          router.refresh();
        },
      },
    },
  );

  return (
    <>
      <Button
        type={"button"}
        role={"secondary"}
        title={"email"}
        onClick={clickHandler}
      >
        {dict.settings.email.full}
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} onClose={reset}>
        <Form
          onSubmit={handleSubmit(submitHandler)}
          title={dict.settings.email.title}
        >
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
            title={dict.settings.email.full}
            isPending={isPending}
          >
            {dict.settings.email.partial}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default EmailChanger;
