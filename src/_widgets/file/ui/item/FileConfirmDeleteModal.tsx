import { File, useDeleteFile } from '@/_entities/file';
import {
  Button,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/_shared/ui';
import { FC } from 'react';

interface FileConfirmDeleteModalProps {
  file: File;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const FileConfirmDeleteModal: FC<FileConfirmDeleteModalProps> = ({
  file,
  onOpenChange,
  isOpen,
}) => {
  const { mutate } = useDeleteFile();

  const deleteHandler = () => {
    mutate({ id: file.id });
    onOpenChange(false);
  };

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Are you sure?</ModalTitle>
          <ModalDescription></ModalDescription>
        </ModalHeader>
        <ModalBody>Your files will be deleted</ModalBody>
        <ModalFooter className='gap-2'>
          <Button color='danger' onClick={deleteHandler}>
            Delete
          </Button>
          <ModalClose asChild>
            <Button>Cancel</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
