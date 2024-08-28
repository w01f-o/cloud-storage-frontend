"use client";

import { FC, useState } from "react";
import Button from "@/components/shared/UI/Button/Button";
import { Plus } from "lucide-react";
import styles from "./createFolder.module.scss";
import Modal from "@/components/shared/UI/Modal/Modal";
import { useForm } from "react-hook-form";
import Field from "@/components/shared/UI/Field/Field";
import { useRouter } from "next/navigation";
import { CreateFolderDto } from "@/types/dtos/createFolder.dto";
import { createFolderAction } from "@/actions/folders.actions";
import { RootDictionary } from "@/types/dictionaries.type";
import { useToast } from "@/hooks/useToast";

interface CreateFolderProps {
  dict: RootDictionary;
}

const CreateFolder: FC<CreateFolderProps> = ({ dict }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const clickHandler = () => {
    setModalIsOpen(true);
  };

  const { register, handleSubmit, reset } = useForm<CreateFolderDto>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const toast = useToast();

  const submitHandler = async (data: CreateFolderDto) => {
    router.push(`/?${new URLSearchParams({ create: data.name }).toString()}`);
    setIsPending(true);
    const result = await createFolderAction(data);
    setIsPending(false);

    if (!result.success) {
      toast.add({
        type: "error",
        message: dict.folders.error,
      });
    } else {
      setModalIsOpen(false);
      toast.add({ type: "success", message: dict.folders.success });
      reset();
      router.refresh();
    }
  };

  return (
    <div className={styles.wrapper}>
      <Button
        type={"button"}
        role={"secondary"}
        title={dict.folders.create.full}
        rounded={true}
        onClick={clickHandler}
      >
        <Plus />
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
          <h5>{dict.folders.title}</h5>
          <Field
            placeholder={dict.folders.name}
            type="text"
            {...register("name", {
              required: true,
            })}
          />
          <Field
            type="color"
            {...register("color", {
              required: true,
            })}
            style={{
              height: 52,
            }}
          />
          <Button
            type={"submit"}
            role={"primary"}
            title={"Создать"}
            isPending={isPending}
          >
            {dict.folders.create.partial}
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default CreateFolder;
