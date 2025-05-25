'use client';

import { MutationUserKeys } from '@/_entities/user';
import { useDisclosure } from '@/_shared/lib';
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
import { useIsMutating } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { FC, useId } from 'react';
import { ChangeUserPasswordForm } from './ChangeUserPasswordForm';

export const UserPasswordChanger: FC = () => {
  const t = useTranslations('SettingsPage.account.password');
  const commonT = useTranslations('common');
  const formId = useId();
  const isPending = !!useIsMutating({
    mutationKey: [MutationUserKeys.UPDATE],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    predicate: mutation => mutation.state.variables.password,
  });

  const { close, isOpen, toggle } = useDisclosure();

  return (
    <Modal open={isOpen} onOpenChange={toggle}>
      <ModalTrigger asChild>
        <Button>{commonT('change')}</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{t('title')}</ModalTitle>
          <ModalDescription>{t('description')}</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <ChangeUserPasswordForm id={formId} closeModal={close} />
        </ModalBody>
        <ModalFooter className='justify-between'>
          <ModalClose asChild>
            <Button color='secondary'>{commonT('cancel')}</Button>
          </ModalClose>
          <Button type='submit' form={formId} isLoading={isPending}>
            {commonT('change')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
