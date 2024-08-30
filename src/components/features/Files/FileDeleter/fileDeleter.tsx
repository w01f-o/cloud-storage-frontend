import { Dispatch, FC, SetStateAction } from "react";
import styles from "./fileDeleter.module.scss";
import { File } from "@/types/file.type";
import Modal from "@/components/shared/UI/Modal/Modal";
import { RootDictionary } from "@/types/dictionaries.type";
import Button from "@/components/shared/UI/Button/Button";
import { useForm } from "react-hook-form";
import { useSubmit } from "@/hooks/useSubmit";
import { deleteFolderAction } from "@/actions/folders.actions";

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
}) => {
  const { handleSubmit } = useForm();

  const { isPending, submitHandler } = useSubmit(
    () => deleteFolderAction(file.id),
    {
      type: "delete",
      errorMessage: () => "Error",
      successMessage: "Folder deleted",
    },
    { onEnd: () => setModalIsOpen(false) },
  );

  return (
    <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Button
          type={"submit"}
          role={"primary"}
          title={"Delete"}
          isPending={isPending}
        >
          Delete
        </Button>
      </form>
    </Modal>
  );
};

export default FileDeleter;
