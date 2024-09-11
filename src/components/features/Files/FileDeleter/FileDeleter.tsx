import { Dispatch, FC, SetStateAction } from "react";
import { File } from "@/types/entities/file.type";
import Modal from "@/components/shared/UI/Modal/Modal";
import { RootDictionary } from "@/types/dictionaries.type";
import Button from "@/components/shared/UI/Button/Button";
import { useForm } from "react-hook-form";
import { useSubmit } from "@/hooks/useSubmit";
import { deleteFileAction } from "@/actions/files.actions";
import Form from "@/components/shared/UI/Form/Form";

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
      events: {
        onEnd: () => setModalIsOpen(false),
      },
    },
  );

  return (
    <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Form
        onSubmit={handleSubmit(submitHandler)}
        title={dict.files.delete.warning}
      >
        <Button
          type={"submit"}
          role={"primary"}
          title={dict.files.delete.full}
          isPending={isPending}
        >
          {dict.files.delete.partial}
        </Button>
      </Form>
    </Modal>
  );
};

export default FileDeleter;
