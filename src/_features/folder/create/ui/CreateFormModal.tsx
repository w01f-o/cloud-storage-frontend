'use client';

import { FolderMutationKeys } from '@/_entities/folder';
import { useDisclosure } from '@/_shared/lib';
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
  ModalTrigger,
} from '@/_shared/ui';
import { IconPlus } from '@tabler/icons-react';
import { useIsMutating } from '@tanstack/react-query';
import { FC, useId } from 'react';
import { CreateFolderForm } from './CreateFolderForm';

export const CreateFormModal: FC = () => {
  const isPending = !!useIsMutating({
    mutationKey: [FolderMutationKeys.CREATE],
  });
  const formId = useId();

  const { close, isOpen, toggle } = useDisclosure();

  return (
    <Modal open={isOpen} onOpenChange={toggle}>
      <ModalTrigger asChild>
        <Button isIconOnly radius='full'>
          <IconPlus />
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Create folder</ModalTitle>
          <ModalDescription></ModalDescription>
        </ModalHeader>
        <ModalBody>
          <CreateFolderForm id={formId} closeModal={close} />
        </ModalBody>
        <ModalFooter className='gap-2'>
          <Button isLoading={isPending} form={formId}>
            Create
          </Button>
          <ModalClose asChild>
            <Button color='secondary'>Cancel</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
