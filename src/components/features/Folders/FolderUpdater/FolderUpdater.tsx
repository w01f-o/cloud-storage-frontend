import { Dispatch, FC, SetStateAction } from "react";
import { Folder } from "@/types/entities/folder.type";
import { useForm } from "react-hook-form";
import { updateFolderAction } from "@/actions/folders.actions";
import Modal from "@/components/shared/UI/Modal/Modal";
import Field from "@/components/shared/UI/Field/Field";
import Button from "@/components/shared/UI/Button/Button";
import { UpdateFolderDto } from "@/types/dtos/users/updateFolder.dto";
import { useSubmit } from "@/hooks/useSubmit";
import { RootDictionary } from "@/types/dictionaries.type";
import Form from "@/components/shared/UI/Form/Form";
import FormFieldError from "@/components/shared/UI/Form/FormFieldError";

interface ChangeColorProps {
  folder: Folder;
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  dict: RootDictionary;
}

const FolderUpdater: FC<ChangeColorProps> = ({
  folder,
  setModalIsOpen,
  modalIsOpen,
  dict,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateFolderDto>();

  const { isPending, submitHandler } = useSubmit<UpdateFolderDto>(
    (data) => updateFolderAction(folder.id, data),
    {
      type: "update",
      reset,
      successMessage: dict.folders.success.update,
      errorMessage: () => dict.folders.error.update,
      events: {
        onEnd: () => setModalIsOpen(false),
      },
    },
  );

  return (
    <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} onClose={reset}>
      <Form
        onSubmit={handleSubmit(submitHandler)}
        title={dict.folders.update.title}
      >
        <Field
          {...register("name", {
            required: {
              value: true,
              message: dict.auth.required,
            },
          })}
          title={dict.folders.name}
          defaultValue={folder.name}
          aria-invalid={errors.name ? "true" : "false"}
          autoFocus
        />
        <FormFieldError errors={errors} field={"name"} />
        <Field
          {...register("color", {
            required: {
              value: true,
              message: dict.auth.required,
            },
          })}
          type="color"
          title={dict.folders.color}
          defaultValue={folder.color}
          aria-invalid={errors.color ? "true" : "false"}
        />
        <FormFieldError errors={errors} field={"color"} />
        <Button role={"primary"} isPending={isPending}>
          {dict.folders.update.partial}
        </Button>
      </Form>
    </Modal>
  );
};

export default FolderUpdater;
