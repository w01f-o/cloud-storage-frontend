"use client";

import { FC, useEffect, useState } from "react";
import Button from "@/components/shared/UI/Button/Button";
import { Plus } from "lucide-react";
import styles from "./createFolder.module.scss";
import Modal from "@/components/shared/UI/Modal/Modal";
import { useForm } from "react-hook-form";
import Field from "@/components/shared/UI/Field/Field";
import { CreateFolderDto } from "@/types/dtos/createFolder.dto";
import { RootDictionary } from "@/types/dictionaries.type";
import { useSubmit } from "@/hooks/useSubmit";
import { createFolderAction } from "@/actions/folders.actions";

interface CreateFolderProps {
  dict: RootDictionary;
}

const CreateFolder: FC<CreateFolderProps> = ({ dict }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm<CreateFolderDto>();

  const { isPending, submitHandler } = useSubmit(
    createFolderAction,
    {
      reset,
      successMessage: dict.folders.success.create,
      errorMessage: () => dict.folders.error.create,
      type: "create",
    },
    {
      onEnd: () => setModalIsOpen(false),
    },
  );

  useEffect(() => {
    setTimeout(() => {
      modalIsOpen && setFocus("name");
    });
  }, [modalIsOpen, setFocus]);

  return (
    <div className={styles.wrapper}>
      <Button
        type={"button"}
        role={"secondary"}
        title={dict.folders.create.full}
        rounded={true}
        onClick={toggleModal}
      >
        <Plus />
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} onClose={reset}>
        <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
          <h5>{dict.folders.title}</h5>
          <Field
            placeholder={dict.folders.name}
            type="text"
            {...register("name", {
              required: true,
            })}
            title={dict.folders.name}
            aria-invalid={errors.name ? "true" : "false"}
          />
          <Field
            type="color"
            {...register("color", {
              required: true,
            })}
            title={dict.folders.color}
            aria-invalid={errors.color ? "true" : "false"}
          />
          <Button
            type={"submit"}
            role={"primary"}
            title={dict.folders.create.full}
            isPending={isPending}
          >
            {dict.folders.create.partial}
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default CreateFolder;