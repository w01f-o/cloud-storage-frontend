import { useUpdateUser } from '@/_entities/user/lib/hooks/useUpdateUser';
import { useDisclosure } from '@/_shared/lib';
import { useLocale, useTranslations } from 'next-intl';
import prettyBytes from 'pretty-bytes';
import {
  Dispatch,
  Ref,
  SetStateAction,
  SyntheticEvent,
  useRef,
  useState,
} from 'react';
import {
  DropzoneInputProps,
  DropzoneRootProps,
  useDropzone,
} from 'react-dropzone';
import { Crop } from 'react-image-crop';
import { toast } from 'sonner';

type DropAcceptedHandler = (files: File[]) => void;
type ImageLoadHandler = (event: SyntheticEvent<HTMLImageElement>) => void;

interface UseAvatarChangerReturn {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => DropzoneRootProps;
  getInputProps: <T extends DropzoneInputProps>(
    props?: T
  ) => DropzoneInputProps;
  isDragActive: boolean;
  cropperIsOpen: boolean;
  toggleCropper: () => void;
  crop: Crop | undefined;
  setCrop: Dispatch<SetStateAction<Crop | undefined>>;
  uploadedAvatar: string | null;
  imageRef: Ref<HTMLImageElement>;
  imageLoadHandler: ImageLoadHandler;
  submitHandler: () => Promise<void>;
  isPending: boolean;
}

export const useAvatarChanger = (): UseAvatarChangerReturn => {
  const t = useTranslations('SettingsPage.account.avatar');
  const locale = useLocale();

  const { mutateAsync: updateUser, isPending } = useUpdateUser({
    onError: () => {
      toast.error(t('errors.unknown'));
    },
    onSuccess: () => {
      toast.success(t('success'));
    },
  });
  const {
    isOpen: cropperIsOpen,
    open: openCropper,
    close: closeCropper,
    toggle: toggleCropper,
  } = useDisclosure();

  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const imageRef = useRef<HTMLImageElement>(null);

  const clearUploadedAvatar = () => {
    if (uploadedAvatar) {
      URL.revokeObjectURL(uploadedAvatar);
      setUploadedAvatar(null);
    }
  };

  const dropAcceptedHandler: DropAcceptedHandler = files => {
    clearUploadedAvatar();
    const fileUrl = URL.createObjectURL(files[0]);
    setUploadedAvatar(fileUrl);
    openCropper();
  };

  const dropRejectedHandler = () => {
    toast.error(
      t('errors.invalidFile', {
        format: 'png, jpeg, jpg',
        size: prettyBytes(5120, {
          locale,
        }),
      })
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxSize: 5 * 1024 * 1024,
    onDropAccepted: dropAcceptedHandler,
    onDropRejected: dropRejectedHandler,
  });

  const imageLoadHandler: ImageLoadHandler = ({ currentTarget }) => {
    const { offsetWidth, offsetHeight } = currentTarget;
    const size = Math.min(offsetWidth, offsetHeight);

    setCrop({
      unit: 'px',
      width: size,
      height: size,
      x: (offsetWidth - size) / 2,
      y: (offsetHeight - size) / 2,
    });
  };

  const getCroppedImage = async (): Promise<File | undefined> => {
    const image = imageRef.current;
    if (!image || !crop) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    const cropWidth = crop.width * scaleX;
    const cropHeight = crop.height * scaleY;

    const size = Math.min(cropWidth, cropHeight);

    const offscreen = new OffscreenCanvas(size, size);
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    const scale = Math.max(size / cropWidth, size / cropHeight);
    const drawWidth = cropWidth * scale;
    const drawHeight = cropHeight * scale;

    const dx = (size - drawWidth) / 2;
    const dy = (size - drawHeight) / 2;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      dx,
      dy,
      drawWidth,
      drawHeight
    );

    const blob = await offscreen.convertToBlob({ type: 'image/png' });

    return new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
  };

  const submitHandler = async () => {
    const avatar = await getCroppedImage();
    if (!avatar) return;

    await updateUser({ avatar });
    closeCropper();
    setCrop(undefined);
    clearUploadedAvatar();
  };

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    cropperIsOpen,
    crop,
    setCrop,
    toggleCropper,
    uploadedAvatar,
    imageRef,
    imageLoadHandler,
    submitHandler,
    isPending,
  };
};
