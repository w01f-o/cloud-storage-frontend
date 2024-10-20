"use client";

import { FC, useState } from "react";
import { RootDictionary } from "@/types/dictionaries.type";
import Button from "@/components/shared/UI/Button/Button";
import { useForm } from "react-hook-form";
import { UpdateNameDto } from "@/types/dtos/users/updateName.dto";
import { useSubmit } from "@/hooks/useSubmit";
import { updateNameAction } from "@/actions/users.action";
import Modal from "@/components/shared/UI/Modal/Modal";
import Field from "@/components/shared/UI/Field/Field";
import Form from "@/components/shared/UI/Form/Form";
import FormFieldError from "@/components/shared/UI/Form/FormFieldError";

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
  const { isPending, submitHandler } = useSubmit(updateNameAction, {
    reset,
    type: "update",
    successMessage: dict.settings.name.success,
    errorMessage: () => dict.settings.name.error,
    events: {
      onEnd: () => setModalIsOpen(false),
    },
  });

  return (
    <>
      <Button role={"secondary"} onClick={clickHandler}>
        {dict.settings.name.full}
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} onClose={reset}>
        <Form
          title={dict.settings.name.full}
          onSubmit={handleSubmit(submitHandler)}
        >
          <Field
            {...register("name", {
              required: {
                value: true,
                message: dict.auth.required,
              },
            })}
            type="text"
            placeholder={dict.auth.name}
            defaultValue={oldName}
            aria-invalid={errors.name ? "true" : "false"}
          />
          <FormFieldError errors={errors} field={"name"} />
          <Button role={"primary"} isPending={isPending}>
            {dict.settings.name.partial}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default NameChanger;
