"use client";

import { FC, useState } from "react";
import { RootDictionary } from "@/types/dictionaries.type";
import Button from "@/components/shared/UI/Button/Button";
import Modal from "@/components/shared/UI/Modal/Modal";
import styles from "./accountDeleter.module.scss";
import { useSubmit } from "@/hooks/useSubmit";
import { useForm } from "react-hook-form";
import { UpdateNameDto } from "@/types/dtos/users/updateName.dto";
import { deleteUserAction } from "@/actions/users.action";
import Form from "@/components/shared/UI/Form/Form";
import { logoutAction } from "@/actions/auth.actions";

interface AccountDeleterProps {
  dict: RootDictionary;
}

const AccountDeleter: FC<AccountDeleterProps> = ({ dict }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const clickHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const { isPending, submitHandler } = useSubmit<UpdateNameDto>(
    deleteUserAction,
    {
      successMessage: dict.settings.delete.success,
      errorMessage: () => dict.settings.delete.error,
      events: {
        onError: () => setModalIsOpen(false),
        onSuccess: logoutAction,
      },
    },
  );
  const { handleSubmit } = useForm<UpdateNameDto>();

  return (
    <>
      <Button
        role="secondary"
        title={dict.settings.delete.full}
        type="button"
        onClick={clickHandler}
        isDanger
      >
        {dict.settings.delete.full}
      </Button>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <Form
          onSubmit={handleSubmit(submitHandler)}
          title={dict.settings.delete.title}
        >
          <div className={styles.warning}>{dict.settings.delete.warning}</div>
          <Button
            type={"submit"}
            role={"primary"}
            title={dict.settings.delete.full}
            isPending={isPending}
          >
            {dict.settings.delete.partial}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default AccountDeleter;
