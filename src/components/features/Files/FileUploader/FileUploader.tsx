"use client";

import { FC, useState } from "react";
import Button from "@/components/shared/UI/Button/Button";
import { PlusIcon } from "lucide-react";
import Modal from "@/components/shared/UI/Modal/Modal";
import Field from "@/components/shared/UI/Field/Field";
import { useForm } from "react-hook-form";
import { uploadFileAction } from "@/actions/files.actions";
import { UploadFileDto } from "@/types/dtos/uploadFile.dto";
import { useSubmit } from "@/hooks/useSubmit";
import styles from "./fileUploader.module.scss";
import FileInput from "@/components/shared/UI/FileInput/FileInput";

interface FileUploaderProps {
  folderId: string;
}

const FileUploader: FC<FileUploaderProps> = ({ folderId }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const clickHandler = () => {
    setModalIsOpen(true);
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UploadFileDto>();

  const { isPending, submitHandler } = useSubmit(
    (data: UploadFileDto) => {
      const formData = new FormData();

      formData.append("file", data.file[0]);
      formData.append("name", data.name);
      formData.append("folderId", folderId);

      return uploadFileAction(formData);
    },
    {
      reset,
      successMessage: "File uploaded",
      errorMessage: () => "Error",
      type: "upload",
    },
    { onEnd: () => setModalIsOpen(false) },
  );

  return (
    <div className={styles.wrapper}>
      <Button
        role={"primary"}
        title={"Upload"}
        type={"button"}
        rounded
        onClick={clickHandler}
      >
        <PlusIcon />
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
          <h5>Загрузка файла</h5>
          <FileInput
            {...register("file")}
            aria-invalid={errors.file ? "true" : "false"}
            setValue={setValue}
          />
          <Field
            {...register("name", {
              required: true,
            })}
            aria-invalid={errors.name ? "true" : "false"}
            placeholder={"Имя файла"}
          />
          <Button
            type={"submit"}
            role={"primary"}
            title={"Upload"}
            isPending={isPending}
          >
            Upload
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default FileUploader;
