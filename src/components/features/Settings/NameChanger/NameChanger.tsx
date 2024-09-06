"use client";

import { FC, useState } from "react";
import { RootDictionary } from "@/types/dictionaries.type";
import Button from "@/components/shared/UI/Button/Button";
import { useForm } from "react-hook-form";
import { UpdateNameDto } from "@/types/dtos/updateName.dto";
import { useSubmit } from "@/hooks/useSubmit";
import { updateNameAction } from "@/actions/users.action";
import Modal from "@/components/shared/UI/Modal/Modal";
import Field from "@/components/shared/UI/Field/Field";
import styles from "./nameChanger.module.scss";

interface NameChangerProps {
  dict: RootDictionary;
  oldName: string;
}

const NameChanger: FC<NameChangerProps> = ({ dict, oldName }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const clickHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateNameDto>();
  const { isPending, submitHandler } = useSubmit(
    updateNameAction,
    {
      reset,
      type: "update",
      successMessage: "success",
      errorMessage: (error) => error,
    },
    {
      onEnd: () => setModalIsOpen(false),
    },
  );

  return (
    <>
      <Button
        type={"button"}
        role={"secondary"}
        title={"Change name"}
        onClick={clickHandler}
      >
        Изменить имя
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} onClose={reset}>
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <h5>Изменить имя</h5>
          <Field
            {...register("name", {
              required: {
                value: true,
                message: dict.auth.required,
              },
            })}
            type="text"
            placeholder={"Имя"}
            defaultValue={oldName}
            aria-invalid={errors.name ? "true" : "false"}
          />
          <div className={styles.error}>{errors?.name?.message}</div>
          <Button
            type={"submit"}
            role={"primary"}
            title={"Изменить имя"}
            isPending={isPending}
          >
            Изменить имя
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default NameChanger;
