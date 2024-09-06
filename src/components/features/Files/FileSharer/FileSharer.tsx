import { Dispatch, FC, SetStateAction, useState, MouseEvent } from "react";
import { RootDictionary } from "@/types/dictionaries.type";
import Modal from "@/components/shared/UI/Modal/Modal";
import { useSubmit } from "@/hooks/useSubmit";
import { useForm } from "react-hook-form";
import Button from "@/components/shared/UI/Button/Button";
import {
  getSharedFileByIdAction,
  shareFileAction,
  unShareFileAction,
} from "@/actions/files.actions";
import styles from "./fileSharer.module.scss";
import { File } from "@/types/file.type";
import Link from "next/link";
import { useToast } from "@/hooks/useToast";

interface FileSharerProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  dict: RootDictionary;
  file: File;
}

const FileSharer: FC<FileSharerProps> = ({
  dict,
  setModalIsOpen,
  modalIsOpen,
  file,
}) => {
  const [linkIsOpen, setLinkIsOpen] = useState<boolean>(false);
  const [link, setLink] = useState<string | null>(null);

  const { handleSubmit } = useForm();
  const { isPending, submitHandler } = useSubmit(
    () => {
      return file.isShared
        ? unShareFileAction(file.id)
        : shareFileAction(file.id);
    },
    {
      type: "success",
      successMessage: file.isShared
        ? dict.files.share.unshared
        : dict.files.share.shared,
      errorMessage: (error) => error,
    },
    {},
  );

  const toast = useToast();

  const linkClickHandler = async () => {
    if (!linkIsOpen) {
      const result = await getSharedFileByIdAction(file.id);

      if (result.success) {
        setLink(
          `${process.env.NEXT_PUBLIC_BASE_URL}/shared/file/${result.value.link}`,
        );
        setLinkIsOpen(true);

        try {
          await navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_BASE_URL}/shared/file/${result.value.link}`,
          );
          toast.add({
            type: "success",
            message: "copied",
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  const contextMenuClickHandler = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(link!);
      toast.add({
        type: "success",
        message: "copied",
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <form className={styles.form}>
        <h5>{dict.files.share.full}</h5>
        {file.isShared && (
          <div className={styles.linkWrapper}>
            {dict.files.share.link}:
            {linkIsOpen ? (
              <Link
                href={link!}
                target={"_blank"}
                onContextMenu={contextMenuClickHandler}
              >
                {link}
              </Link>
            ) : (
              <button
                className={styles.blured}
                onClick={linkClickHandler}
                type="button"
              ></button>
            )}
          </div>
        )}
        <Button
          type="submit"
          onClick={handleSubmit(submitHandler)}
          role={"primary"}
          title={
            file.isShared ? dict.files.share.private : dict.files.share.public
          }
          isPending={isPending}
        >
          {file.isShared ? dict.files.share.private : dict.files.share.public}
        </Button>
      </form>
    </Modal>
  );
};

export default FileSharer;
