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
  const t = useTranslations('FolderItem');
  const locale = useLocale();
  const formId = useId();
  const formatter = useFormatter();

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle className='flex items-center gap-2'>
            {t('modal.title')}
          </ModalTitle>
          <ModalDescription>{folder.name}</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <UpdateFolderForm folder={folder} id={formId} />
          <div className='flex gap-2 pt-4 pb-2'>
            <div className='w-1/3'>Size:</div>
            <div>
              {prettyBytes(folder.size, { locale })} (
              {formatter.number(folder.size)} B)
            </div>
          </div>
        </ModalBody>
        <ModalFooter className='gap-2'>
          <Button form={formId}>Apply</Button>
          <ModalClose asChild>
            <Button color='secondary'>Cancel</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
