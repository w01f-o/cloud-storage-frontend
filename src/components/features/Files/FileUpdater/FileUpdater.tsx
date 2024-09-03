import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { File } from "@/types/file.type";
import styles from "./fileUpdater.module.scss";
import Modal from "@/components/shared/UI/Modal/Modal";
import { RootDictionary } from "@/types/dictionaries.type";
import { useSubmit } from "@/hooks/useSubmit";
import { useForm } from "react-hook-form";
import { updateFileAction } from "@/actions/files.actions";
import { UpdateFileDto } from "@/types/dtos/updateFile.dto";
import Field from "@/components/shared/UI/Field/Field";
import Button from "@/components/shared/UI/Button/Button";

interface FileUpdaterProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  file: File;
  dict: RootDictionary;
}

const FileUpdater: FC<FileUpdaterProps> = ({
  file,
  setModalIsOpen,
  modalIsOpen,
  dict,
}) => {
  const { handleSubmit, reset, register, setFocus } = useForm<UpdateFileDto>();
  const { submitHandler, isPending } = useSubmit<UpdateFileDto>(
    (data: UpdateFileDto) => updateFileAction(file.id, data),
    {
      reset,
      type: "update",
      errorMessage: () => dict.files.update.error,
      successMessage: dict.files.update.success,
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
    <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <h5> {dict.files.update.full}</h5>
        <Field
          {...register("name", {
            required: true,
          })}
          defaultValue={file.name}
        />
        <Button
          type={"submit"}
          role={"primary"}
          title={dict.files.update.full}
          isPending={isPending}
        >
          {dict.files.update.partial}
        </Button>
      </form>
    </Modal>
  );
};

export default FileUpdater;