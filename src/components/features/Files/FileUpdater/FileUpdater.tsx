import { Dispatch, FC, SetStateAction } from "react";
import { File } from "@/types/entities/file.type";
import Modal from "@/components/shared/UI/Modal/Modal";
import { RootDictionary } from "@/types/dictionaries.type";
import { useSubmit } from "@/hooks/useSubmit";
import { useForm } from "react-hook-form";
import { updateFileAction } from "@/actions/files.actions";
import { UpdateFileDto } from "@/types/dtos/users/updateFile.dto";
import Field from "@/components/shared/UI/Field/Field";
import Button from "@/components/shared/UI/Button/Button";
import Form from "@/components/shared/UI/Form/Form";

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
  const { handleSubmit, reset, register } = useForm<UpdateFileDto>();
  const { submitHandler, isPending } = useSubmit<UpdateFileDto>(
    (data: UpdateFileDto) => updateFileAction(file.id, data),
    {
      reset,
      type: "update",
      errorMessage: () => dict.files.update.error,
      successMessage: dict.files.update.success,
      events: {
        onEnd: () => setModalIsOpen(false),
      },
    },
  );

  return (
    <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Form
        onSubmit={handleSubmit(submitHandler)}
        title={dict.files.update.full}
      >
        <Field
          {...register("name", {
            required: true,
          })}
          defaultValue={file.name}
          autoFocus
        />
        <Button
          type={"submit"}
          role={"primary"}
          title={dict.files.update.full}
          isPending={isPending}
        >
          {dict.files.update.partial}
        </Button>
      </Form>
    </Modal>
  );
};

export default FileUpdater;
