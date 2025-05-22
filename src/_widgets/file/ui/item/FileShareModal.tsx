import { File } from '@/_entities/file';
import { SharedFileMutationKeys } from '@/_entities/shared-file/model/enums/mutation-keys.enum';
import { SharedFileLink } from '@/_features/file/share/ui/SharedFileLink';
import { ShareFileForm } from '@/_features/file/share/ui/ShareFileForm';
import {
  Button,
  FadeInOut,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/_shared/ui';
import { useIsMutating } from '@tanstack/react-query';
import { FC, useId } from 'react';

interface FileShareModalProps {
  file: File;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const FileShareModal: FC<FileShareModalProps> = ({
  isOpen,
  onOpenChange,
  file,
}) => {
  const formId = useId();
  const isPending = !!useIsMutating({
    mutationKey: [SharedFileMutationKeys.SHARE],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    predicate: mutation => mutation.state.variables?.id === file.id,
  });

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent size='2xl'>
        <ModalHeader>
          <ModalTitle>Share file</ModalTitle>
          <ModalDescription></ModalDescription>
        </ModalHeader>
        <ModalBody className='flex flex-col gap-2 py-6'>
          <ShareFileForm id={formId} file={file} />
          <FadeInOut isVisible={file.isShared}>
            <SharedFileLink id={file.id} />
          </FadeInOut>
        </ModalBody>
        <ModalFooter className='gap-2'>
          <Button form={formId} isLoading={isPending}>
            Apply
          </Button>
          <ModalClose asChild>
            <Button>Cancel</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
