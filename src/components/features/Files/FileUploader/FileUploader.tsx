"use client";

import { FC, useCallback, useState } from "react";
import Button from "@/components/shared/UI/Button/Button";
import { FileIcon, PlusIcon } from "lucide-react";
import Modal from "@/components/shared/UI/Modal/Modal";
import Field from "@/components/shared/UI/Field/Field";
import { useForm } from "react-hook-form";
import { uploadFileAction } from "@/actions/files.actions";
import { UploadFileDto } from "@/types/dtos/files/uploadFile.dto";
import { useSubmit } from "@/hooks/useSubmit";
import styles from "./fileUploader.module.scss";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";
import { RootDictionary } from "@/types/dictionaries.type";
import Form from "@/components/shared/UI/Form/Form";
import { useToast } from "@/hooks/useToast";

interface FileUploaderProps {
  folderId: string;
  dict: RootDictionary;
}

const FileUploader: FC<FileUploaderProps> = ({ folderId, dict }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const clickHandler = () => {
    setModalIsOpen(true);
  };
  const { register, handleSubmit, reset, setValue } = useForm<UploadFileDto>();
  const toast = useToast();

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
      successMessage: dict.files.upload.success,
      errorMessage: () => dict.files.upload.error,
      type: "upload",
      events: {
        onStart: () => {
          setModalIsOpen(false);
          toast.add({ type: "info", message: dict.files.upload.start });
        },
      },
    },
  );

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setValue("file", acceptedFiles);
    setUploadedFile(acceptedFiles[0]);
    setValue("name", acceptedFiles[0].name);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const closeModalHandler = useCallback(() => {
    reset();
    setUploadedFile(null);
  }, [reset]);

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
      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        onClose={closeModalHandler}
      >
        <Form
          onSubmit={handleSubmit(submitHandler)}
          title={dict.files.upload.full}
          className={styles.form}
        >
          <div
            {...getRootProps()}
            className={clsx(styles.file, {
              [styles.dragEnter]: isDragActive,
              [styles.ready]: uploadedFile,
            })}
          >
            <FileIcon />
            <input type="file" {...getInputProps()} />
          </div>
          {uploadedFile && (
            <div className={styles.fileName}>{uploadedFile.name}</div>
          )}
          <Field
            {...register("name", {
              required: true,
            })}
            hidden
            tabIndex={-1}
          />
          <Button
            type={"submit"}
            role={"primary"}
            title={dict.files.upload.full}
            isPending={isPending}
          >
            {dict.files.upload.partial}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default FileUploader;
