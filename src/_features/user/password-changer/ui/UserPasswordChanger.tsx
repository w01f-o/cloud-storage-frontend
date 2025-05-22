'use client';

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
  ModalTrigger,
} from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC, useId } from 'react';
import { ChangeUserPasswordForm } from './ChangeUserPasswordForm';

export const UserPasswordChanger: FC = () => {
  const t = useTranslations('SettingsPage.account');
  const formId = useId();

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button>{t('change')}</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{t('password.title')}</ModalTitle>
          <ModalDescription>{t('password.description')}</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <ChangeUserPasswordForm id={formId} />
        </ModalBody>
        <ModalFooter className='justify-between'>
          <ModalClose asChild>
            <Button color='secondary'>{t('password.cancel')}</Button>
          </ModalClose>
          <Button type='submit' form={formId}>
            {t('submit')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
