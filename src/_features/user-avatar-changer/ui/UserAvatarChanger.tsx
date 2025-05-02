'use client';

import { useSession } from '@/_entities/auth';
import { getApiStaticUrl } from '@/_shared/lib';
import {
  Avatar,
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
import { IconFileUpload } from '@tabler/icons-react';
import { FC } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useAvatarChanger } from '../model/useAvatarChanger';

export const UserAvatarChanger: FC = () => {
  const user = useSession();
  const {
    getInputProps,
    getRootProps,
    isDragActive,
    cropperIsOpen,
    toggleCropper,
    crop,
    setCrop,
    uploadedAvatar,
    imageLoadHandler,
    imageRef,
    submitHandler,
    isPending,
  } = useAvatarChanger();

  return (
    <>
      <div {...getRootProps()} className='relative cursor-pointer'>
        <input type='file' {...getInputProps()} />
        <Avatar
          src={user?.avatar ? getApiStaticUrl(user.avatar) : null}
          size='sm'
        />
        <FadeInOut isVisible={isDragActive}>
          <div className='bg-overlay/50 text-content dark:text-foreground absolute inset-0 grid place-items-center rounded-full'>
            <IconFileUpload size={50} />
          </div>
        </FadeInOut>
      </div>
      <Modal open={cropperIsOpen} onOpenChange={toggleCropper}>
        <ModalContent size='2xl'>
          <ModalHeader>
            <ModalTitle>Change avatar</ModalTitle>
            <ModalDescription>Crop your avatar</ModalDescription>
          </ModalHeader>
          <ModalBody>
            <div className='relative flex h-[60vh] justify-center p-8'>
              <ReactCrop
                crop={crop}
                onChange={setCrop}
                circularCrop
                aspect={1}
                minWidth={150}
                minHeight={150}
                className='!flex !h-full'
                keepSelection
                ruleOfThirds
              >
                {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                <img
                  src={uploadedAvatar!}
                  className='size-full object-contain'
                  onLoad={imageLoadHandler}
                  ref={imageRef}
                />
              </ReactCrop>
            </div>
          </ModalBody>
          <ModalFooter className='justify-between'>
            <ModalClose asChild>
              <Button color='secondary'>Cancel</Button>
            </ModalClose>
            <Button onClick={submitHandler} isLoading={isPending}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
