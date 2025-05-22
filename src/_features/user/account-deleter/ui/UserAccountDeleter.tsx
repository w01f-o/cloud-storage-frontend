'use client';

import { useDeleteAccount } from '@/_entities/user/lib/hooks/useDeleteAccount';
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

export const UserAccountDeleter: FC = () => {
  const t = useTranslations('SettingsPage.account.delete');

  const { mutate, isPending } = useDeleteAccount();

  const clickHandler = () => {
    mutate();
  };

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button color='danger'>{t('confirm')}</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{t('title')}</ModalTitle>
        </ModalHeader>
        <ModalBody className='py-2'>{t('warning')}</ModalBody>
        <ModalFooter className='justify-between'>
          <ModalClose asChild>
            <Button>{t('cancel')}</Button>
          </ModalClose>
          <Button color='danger' onClick={clickHandler} isLoading={isPending}>
            {t('confirm')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
