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
    if (
      acceptedFiles[0].type !== "image/png" &&
      acceptedFiles[0].type !== "image/jpeg" &&
      acceptedFiles[0].type !== "image/jpg" &&
      acceptedFiles[0].type !== "image/webp" &&
      acceptedFiles[0].type !== "image/gif"
    ) {
      return;
    }

    setValue("file", acceptedFiles);

    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      setAvatarPreview(reader.result as string);
    };

    setValue("name", acceptedFiles[0].name);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
    },
    {
      onEnd: () => {
        setModalIsOpen(false);
      },
      onError: () => {
        setAvatarPreview(oldAvatarUrl);
      },
    },
  );

  return (
    <>
      <Button
        role="secondary"
        title={dict.settings.avatar.change}
        type="button"
        onClick={clickHandler}
      >
        {dict.settings.avatar.change}
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <h5>{dict.settings.avatar.title}</h5>
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
            <input
              type="file"
              {...getInputProps()}
              {...register("file")}
              accept="image/png, image/gif, image/jpeg, image/webp, image/jpg"
            />
            <input
              type="text"
              {...register("name", {
                required: true,
              })}
              hidden
              tabIndex={-1}
            />
          </div>
          <Button
            type={"submit"}
            role={"primary"}
            title={dict.settings.avatar.full}
            isPending={isPending}
          >
            {dict.settings.avatar.partial}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AvatarChanger;
