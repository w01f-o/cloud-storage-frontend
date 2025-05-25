import { File } from '@/_entities/file';
import { UpdateFileForm } from '@/_features/file/update/ui/UpdateFileForm';
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

interface FilePropertiesModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  file: File;
}

export const FilePropertiesModal: FC<FilePropertiesModalProps> = ({
  isOpen,
  onOpenChange,
  file,
}) => {
  const locale = useLocale();
  const formId = useId();
  const format = useFormatter();
  const tCommon = useTranslations('common');
  const t = useTranslations('FileItem.modal.form');
  const tResolvedFileType = useTranslations('resolvedFileType');

  const formattedCreatedAt = format.dateTime(file.createdAt, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  const formattedUpdatedAt = format.dateTime(file.updatedAt, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  const formattedSize = format.number(file.size);

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent size='lg'>
        <ModalHeader>
          <ModalTitle>{tCommon('properties')}</ModalTitle>
          <ModalDescription>{file.displayName}</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <UpdateFileForm file={file} id={formId} />
          <div className='flex flex-col gap-3 py-4'>
            <div className='flex gap-2'>
              <div className='w-24 md:w-32'>{t('type')}:</div>
              <div className='first-letter:uppercase'>
                {tResolvedFileType(file.resolvedType)}
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='w-24 md:w-32'>{t('uploaded')}:</div>
              <div className='first-letter:uppercase'>{formattedCreatedAt}</div>
            </div>
            <div className='flex gap-2'>
              <div className='w-24 md:w-32'>{t('updated')}:</div>
              <div className='first-letter:uppercase'>{formattedUpdatedAt}</div>
            </div>
            <div className='flex gap-2'>
              <div className='w-24 md:w-32'>{t('size')}:</div>
              <div>
                {prettyBytes(file.size, { locale })} ({formattedSize} B)
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
