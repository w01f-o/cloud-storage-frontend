import { Dispatch, FC, SetStateAction } from "react";
import { Folder } from "@/types/folder.type";
import { useForm } from "react-hook-form";
import { updateFolderAction } from "@/actions/folders.actions";
import Modal from "@/components/shared/UI/Modal/Modal";
import Field from "@/components/shared/UI/Field/Field";
import Button from "@/components/shared/UI/Button/Button";
import { UpdateFolderDto } from "@/types/dtos/updateFolder.dto";
import { useSubmit } from "@/hooks/useSubmit";
import { RootDictionary } from "@/types/dictionaries.type";
import Form from "@/components/shared/UI/Form/Form";

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
            required: true,
          })}
          title={dict.folders.name}
          defaultValue={folder.name}
          aria-invalid={errors.name ? "true" : "false"}
          autoFocus
        />
        <Field
          {...register("color", {
            required: true,
          })}
          type="color"
          title={dict.folders.color}
          defaultValue={folder.color}
          aria-invalid={errors.color ? "true" : "false"}
        />
        <Button
          role="primary"
          title={dict.folders.update.full}
          type="submit"
          isPending={isPending}
        >
          {dict.folders.update.partial}
        </Button>
      </Form>
    </Modal>
  );
};

export default FolderUpdater;
