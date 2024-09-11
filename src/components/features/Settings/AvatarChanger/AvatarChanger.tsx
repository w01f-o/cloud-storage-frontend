"use client";

import { FC, useState } from "react";
import { RootDictionary } from "@/types/dictionaries.type";
import Button from "@/components/shared/UI/Button/Button";
import Modal from "@/components/shared/UI/Modal/Modal";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";
import styles from "./avatarChanger.module.scss";
import { Pen } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSubmit } from "@/hooks/useSubmit";
import { updateAvatarAction } from "@/actions/users.action";
import Form from "@/components/shared/UI/Form/Form";

interface AvatarChangerProps {
  dict: RootDictionary;
  oldAvatarUrl: string;
}

const AvatarChanger: FC<AvatarChangerProps> = ({ dict, oldAvatarUrl }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [avatarPreview, setAvatarPreview] = useState<string>(oldAvatarUrl);

  const clickHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const { register, setValue, handleSubmit, reset } = useForm<{
    name: string;
    file: File[];
  }>();
  const onDrop = (acceptedFiles: File[]) => {
    setValue("file", acceptedFiles);

    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      setAvatarPreview(reader.result as string);
    };

    setValue("name", acceptedFiles[0].name);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpeg", ".jpg", ".gif", ".webp"],
    },
  });

  const { isPending, submitHandler } = useSubmit<{
    name: string;
    file: File[];
  }>(
    (data) => {
      const formData = new FormData();

      formData.append("avatar", data.file[0]);

      return updateAvatarAction(formData);
    },
    {
      type: "update",
      successMessage: "Success",
      reset,
      errorMessage: (error) => error,
      events: {
        onEnd: () => {
          setModalIsOpen(false);
        },
        onError: () => {
          setAvatarPreview(oldAvatarUrl);
        },
      },
    },
  );

  return (
    <>
      <Button role={"secondary"} onClick={clickHandler}>
        {dict.settings.avatar.change}
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <Form
          className={styles.form}
          title={dict.settings.avatar.title}
          onSubmit={handleSubmit(submitHandler)}
        >
          <div
            className={clsx(styles.avatar, {
              [styles.dragActive]: isDragActive,
            })}
            {...getRootProps()}
          >
            <Image
              src={avatarPreview}
              alt={"Avatar"}
              width={200}
              height={200}
              className={clsx(styles.image)}
            />
            <Pen className={styles.pen} width={30} height={30} />
            <input type="file" {...getInputProps()} {...register("file")} />
            <input
              type="text"
              {...register("name", {
                required: true,
              })}
              hidden
              tabIndex={-1}
            />
          </div>
          <Button role={"primary"} isPending={isPending}>
            {dict.settings.avatar.partial}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default AvatarChanger;
