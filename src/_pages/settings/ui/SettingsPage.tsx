import { ThemeSwitcher } from '@/_features/theme';
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
import { FC } from 'react';

export const SettingsPage: FC = () => {
  return (
    <>
      <ThemeSwitcher />
      <Modal>
        <ModalTrigger asChild>
          <Button>Open Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Modal title</ModalTitle>
            <ModalDescription>Description</ModalDescription>
          </ModalHeader>
          <ModalBody>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis
            laborum aliquid rerum est sapiente eius, molestias beatae, iure
            maiores quos quidem dolore quae impedit nihil vero provident
            reiciendis culpa quibusdam!
          </ModalBody>
          <ModalFooter>
            <ModalClose asChild>
              <Button>Close</Button>
            </ModalClose>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
