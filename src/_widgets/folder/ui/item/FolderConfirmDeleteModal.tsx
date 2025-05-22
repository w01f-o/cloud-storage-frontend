import { Folder, useDeleteFolder } from '@/_entities/folder';
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

interface FolderConfirmDeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  folder: Folder;
}

export const FolderConfirmDeleteModal: FC<FolderConfirmDeleteModalProps> = ({
  onOpenChange,
  isOpen,
  folder,
}) => {
  const { mutate } = useDeleteFolder();

  const deleteHandler = () => {
    mutate({ id: folder.id });
    onOpenChange(false);
  };

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Are you sure?</ModalTitle>
          <ModalDescription></ModalDescription>
        </ModalHeader>
        <ModalBody>All your files will be deleted</ModalBody>
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
