import { Folder } from '@/_entities/folder';
import { UpdateFolderForm } from '@/_features/folder';
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
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import prettyBytes from 'pretty-bytes';
import { FC, useId } from 'react';

interface FolderPropertiesModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  folder: Folder;
}

export const FolderPropertiesModal: FC<FolderPropertiesModalProps> = ({
  isOpen,
  onOpenChange,
  folder,
}) => {
  const t = useTranslations('FolderItem.modal.form');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const formId = useId();
  const format = useFormatter();

  const formattedCreatedAt = format.dateTime(folder.createdAt, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  const formattedUpdatedAt = format.dateTime(folder.updatedAt, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  const formattedSize = format.number(folder.size);

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent size='lg'>
        <ModalHeader>
          <ModalTitle className='flex items-center gap-2'>
            {tCommon('properties')}
          </ModalTitle>
          <ModalDescription>{folder.name}</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <UpdateFolderForm folder={folder} id={formId} />
          <div className='flex flex-col gap-3 py-4'>
            <div className='flex gap-2'>
              <div className='w-32'>{t('created')}:</div>
              <div>{formattedCreatedAt}</div>
            </div>
            <div className='flex gap-2'>
              <div className='w-32'>{t('updated')}:</div>
              <div>{formattedUpdatedAt}</div>
            </div>
            <div className='flex gap-2'>
              <div className='w-32'>{t('size')}:</div>
              <div>
                {prettyBytes(folder.size, { locale })} ({formattedSize} B)
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className='gap-2'>
          <Button form={formId}>{tCommon('apply')}</Button>
          <ModalClose asChild>
            <Button color='secondary'>{tCommon('cancel')}</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
