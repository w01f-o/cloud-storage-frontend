import { Dispatch, FC, SetStateAction } from "react";
import { Folder } from "@/types/folder.type";
import { useForm } from "react-hook-form";
import { updateFolderAction } from "@/actions/folders.actions";
import Modal from "@/components/shared/UI/Modal/Modal";
import Field from "@/components/shared/UI/Field/Field";
import Button from "@/components/shared/UI/Button/Button";
import { UpdateFolderDto } from "@/types/dtos/updateFolderDto";
import styles from "./folderUpdate.module.scss";
import { useSubmit } from "@/hooks/useSubmit";
import { RootDictionary } from "@/types/dictionaries.type";

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
    },
    {
      onEnd: () => setModalIsOpen(false),
    },
  );

  return (
    <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} onClose={reset}>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <h5>{dict.folders.update.title}</h5>
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
      </form>
    </Modal>
  );
};

export default FolderUpdater;
