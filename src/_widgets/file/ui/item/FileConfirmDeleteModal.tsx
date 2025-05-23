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
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { toast } from 'sonner';

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
  const t = useTranslations('FileItem.modal.form.delete');
  const { mutate } = useDeleteFile({
    onSuccess: () => {
      toast.success(t('success'));
    },
    onError: () => {
      toast.error(t('errors.server.unknown'));
    },
  });
  const commonT = useTranslations('common');

  const deleteHandler = () => {
    mutate({ id: file.id });
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
            {commonT('delete')}
          </Button>
          <ModalClose asChild>
            <Button>{commonT('cancel')}</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
