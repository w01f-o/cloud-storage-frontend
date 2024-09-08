import { Dispatch, FC, SetStateAction } from "react";
import Modal from "@/components/shared/UI/Modal/Modal";
import { useForm } from "react-hook-form";
import { Folder } from "@/types/folder.type";
import Field from "@/components/shared/UI/Field/Field";
import Button from "@/components/shared/UI/Button/Button";
import { deleteFolderAction } from "@/actions/folders.actions";
import styles from "./folderDeleter.module.scss";
import { useSubmit } from "@/hooks/useSubmit";
import { RootDictionary } from "@/types/dictionaries.type";
import Form from "@/components/shared/UI/Form/Form";

interface DeleteFolderProps {
  folder: Folder;
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  dict: RootDictionary;
}

const FolderDeleter: FC<DeleteFolderProps> = ({
  folder,
  modalIsOpen,
  setModalIsOpen,
  dict,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    name: string;
  }>();

  const { isPending, submitHandler } = useSubmit(
    () => deleteFolderAction(folder.id),
    {
      reset,
      successMessage: dict.folders.success.delete,
      errorMessage: () => dict.folders.error.delete,
      type: "delete",
      events: {
        onEnd: () => setModalIsOpen(false),
      },
    },
  );

  return (
    <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} onClose={reset}>
      <Form
        onSubmit={handleSubmit(submitHandler)}
        title={dict.folders.delete.question}
        className={styles.form}
      >
        <div className={styles.danger}>{dict.folders.delete.warning}</div>
        <div className={styles.confirm}>
          {dict.folders.delete.confirm}
          &quot;{dict.folders.delete.partial}&quot;
        </div>
        <strong className={styles.name}>{folder.name}</strong>
        <Field
          {...register("name", {
            required: true,
            validate: (value) => value === folder.name,
          })}
          title={dict.folders.name}
          autoComplete={"off"}
          autoFocus
          aria-invalid={errors.name ? "true" : "false"}
        />
        <Button
          role="primary"
          title={dict.folders.delete.full}
          type="submit"
          isPending={isPending}
        >
          {dict.folders.delete.partial}
        </Button>
      </Form>
    </Modal>
  );
};

export default FolderDeleter;
