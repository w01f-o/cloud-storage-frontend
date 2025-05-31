'use client';

import { useDeleteAccount } from '@/_entities/user';
import {
  Button,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { toast } from 'sonner';

export const UserAccountDeleter: FC = () => {
  const commonT = useTranslations('common');
  const t = useTranslations('SettingsPage.account.delete');

  const { mutate, isPending } = useDeleteAccount({
    onSuccess: () => {
      toast.success(t('success'));
    },
    onError: () => {
      toast.error(t('errors.unknown'));
    },
  });

  const clickHandler = () => {
    mutate();
  };

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button color='danger'>{commonT('delete')}</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{t('title')}</ModalTitle>
        </ModalHeader>
        <ModalBody className='py-2'>{t('warning')}</ModalBody>
        <ModalFooter className='justify-between'>
          <ModalClose asChild>
            <Button>{commonT('cancel')}</Button>
          </ModalClose>
          <Button color='danger' onClick={clickHandler} isLoading={isPending}>
            {commonT('delete')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
