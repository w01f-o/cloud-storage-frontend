'use client';

import { FolderMutationKeys } from '@/_entities/folder';
import { CreateFolderForm } from '@/_features/folder';
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
import { useTranslations } from 'next-intl';
import { FC, useId } from 'react';

export const CreateFolderFormModal: FC = () => {
  const isPending = !!useIsMutating({
    mutationKey: [FolderMutationKeys.CREATE],
  });
  const formId = useId();
  const t = useTranslations('HomePage.CreateFormModal');
  const tCommon = useTranslations('common');

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
          <ModalTitle>{t('title')}</ModalTitle>
          <ModalDescription></ModalDescription>
        </ModalHeader>
        <ModalBody>
          <CreateFolderForm formId={formId} closeModal={close} />
        </ModalBody>
        <ModalFooter className='gap-2'>
          <Button isLoading={isPending} form={formId}>
            {tCommon('create')}
          </Button>
          <ModalClose asChild>
            <Button color='secondary'>{tCommon('cancel')}</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
