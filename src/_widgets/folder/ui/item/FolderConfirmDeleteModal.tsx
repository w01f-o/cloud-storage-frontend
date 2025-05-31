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
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { toast } from 'sonner';

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
  const t = useTranslations('FolderItem.modal.form.delete');
  const tCommon = useTranslations('common');
  const { mutate } = useDeleteFolder({
    onSuccess: () => {
      toast.success(t('success'));
    },
    onError: () => {
      toast.error(t('errors.server.unknown'));
    },
  });

  const deleteHandler = () => {
    mutate({ id: folder.id });
    onOpenChange(false);
  };

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent size='2xl'>
        <ModalHeader>
          <ModalTitle>{t('title')}</ModalTitle>
          <ModalDescription></ModalDescription>
        </ModalHeader>
        <ModalBody className='py-2 text-lg'>{t('warning')}</ModalBody>
        <ModalFooter className='gap-2'>
          <Button color='danger' onClick={deleteHandler}>
            {tCommon('delete')}
          </Button>
          <ModalClose asChild>
            <Button>{tCommon('cancel')}</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
