'use client';

import { MutationUserKeys } from '@/_entities/user/model/enums/mutation-keys.enum';
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
  const t = useTranslations('SettingsPage.account');
  const formId = useId();
  const isPending = !!useIsMutating({
    mutationKey: [MutationUserKeys.UPDATE],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    predicate: mutation => mutation.state.variables.password,
  });

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
          <Button type='submit' form={formId} isLoading={isPending}>
            {t('submit')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
