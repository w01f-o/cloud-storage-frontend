"use client";

import { FC, useState } from "react";
import Button from "@/components/shared/UI/Button/Button";
import { Plus } from "lucide-react";
import styles from "./folderCreator.module.scss";
import Modal from "@/components/shared/UI/Modal/Modal";
import { useForm } from "react-hook-form";
import Field from "@/components/shared/UI/Field/Field";
import { CreateFolderDto } from "@/types/dtos/folders/createFolder.dto";
import { RootDictionary } from "@/types/dictionaries.type";
import { useSubmit } from "@/hooks/useSubmit";
import { createFolderAction } from "@/actions/folders.actions";
import Form from "@/components/shared/UI/Form/Form";
import FormFieldError from "@/components/shared/UI/Form/FormFieldError";

interface CreateFolderProps {
  dict: RootDictionary;
}

const FolderCreator: FC<CreateFolderProps> = ({ dict }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateFolderDto>();

  const { isPending, submitHandler } = useSubmit<CreateFolderDto>(
    createFolderAction,
    {
      reset,
      successMessage: dict.folders.success.create,
      errorMessage: () => dict.folders.error.create,
      type: "create",
      events: {
        onEnd: () => setModalIsOpen(false),
      },
    },
  );

  return (
    <div className={styles.wrapper}>
      <Button
        type={"button"}
        role={"primary"}
        title={dict.folders.create.full}
        rounded={true}
        onClick={toggleModal}
      >
        <Plus />
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} onClose={reset}>
        <Form onSubmit={handleSubmit(submitHandler)} title={dict.folders.title}>
          <Field
            placeholder={dict.folders.name}
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: dict.auth.required,
              },
            })}
            title={dict.folders.name}
            aria-invalid={errors.name ? "true" : "false"}
            autoFocus
          />
          <FormFieldError errors={errors} field={"name"} />
          <Field
            type="color"
            {...register("color", {
              required: {
                value: true,
                message: dict.auth.required,
              },
            })}
            title={dict.folders.color}
            aria-invalid={errors.color ? "true" : "false"}
          />
          <FormFieldError errors={errors} field={"color"} />
          <Button
            type={"submit"}
            role={"primary"}
            title={dict.folders.create.full}
            isPending={isPending}
          >
            {dict.folders.create.partial}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default FolderCreator;
