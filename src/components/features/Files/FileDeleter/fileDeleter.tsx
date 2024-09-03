import { Dispatch, FC, SetStateAction } from "react";
import { File } from "@/types/file.type";
import Modal from "@/components/shared/UI/Modal/Modal";
import { RootDictionary } from "@/types/dictionaries.type";
import Button from "@/components/shared/UI/Button/Button";
import { useForm } from "react-hook-form";
import { useSubmit } from "@/hooks/useSubmit";
import { deleteFileAction } from "@/actions/files.actions";
import styles from "./fileDeleter.module.scss";

interface FileDeleterProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  file: File;
  dict: RootDictionary;
}

const FileDeleter: FC<FileDeleterProps> = ({
  file,
  setModalIsOpen,
  modalIsOpen,
  dict,
}) => {
  const { handleSubmit } = useForm();

  const { isPending, submitHandler } = useSubmit(
    () => deleteFileAction(file.id),
    {
      type: "delete",
      errorMessage: () => dict.files.delete.error,
      successMessage: dict.files.delete.success,
    },
    { onEnd: () => setModalIsOpen(false) },
  );

  return (
    <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <h5>{dict.files.delete.warning}</h5>
        <Button
          type={"submit"}
          role={"primary"}
          title={dict.files.delete.full}
          isPending={isPending}
        >
          {dict.files.delete.partial}
        </Button>
      </form>
    </Modal>
  );
};

export default FileDeleter;
