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
import { useFormatter, useLocale } from 'next-intl';
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
  const formatter = useFormatter();

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Properties</ModalTitle>
          <ModalDescription>{file.displayName}</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <UpdateFileForm file={file} id={formId} />
          <div className='flex gap-2 pt-4 pb-2'>
            <div className='w-1/3'>Type:</div>
            <div className='first-letter:uppercase'>{file.resolvedType}</div>
          </div>
          <div className='flex gap-2 pt-4 pb-2'>
            <div className='w-1/3'>Size:</div>
            <div>
              {prettyBytes(file.size, { locale })} (
              {formatter.number(file.size)} B)
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
