import { File, FileQueryKeys } from '@/_entities/file';
import { SharedFileMutationKeys } from '@/_entities/shared-file';
import { SharedFileLink, ShareFileForm } from '@/_features/file';
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
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
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
  const isMutating = !!useIsMutating({
    mutationKey: [SharedFileMutationKeys.SHARE],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    predicate: mutation => mutation.state.variables?.id === file.id,
  });
  const fileIsPending = !!useIsFetching({
    predicate: query => {
      if (!Array.isArray(query.queryKey)) return false;

      const queryKey = query.queryKey[0];

      return (
        queryKey === FileQueryKeys.INFINITE_FOLDER_LIST ||
        queryKey === FileQueryKeys.LIST
      );
    },
  });

  const t = useTranslations('ShareFileForm');
  const tCommon = useTranslations('common');

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent size='2xl'>
        <ModalHeader>
          <ModalTitle>{t('title')}</ModalTitle>
          <ModalDescription></ModalDescription>
        </ModalHeader>
        <ModalBody className='flex flex-col gap-2 py-6'>
          <ShareFileForm formId={formId} file={file} />
          <FadeInOut isVisible={file.isShared}>
            <SharedFileLink id={file.id} />
          </FadeInOut>
        </ModalBody>
        <ModalFooter className='gap-2'>
          <Button form={formId} isLoading={isMutating || fileIsPending}>
            {tCommon('apply')}
          </Button>
          <ModalClose asChild>
            <Button color='secondary'>{tCommon('cancel')}</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
