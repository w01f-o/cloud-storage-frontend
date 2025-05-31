'use client';

import { Root as Slot } from '@radix-ui/react-slot';
import NextImage from 'next/image';
import { FC, HTMLAttributes } from 'react';
import { Skeleton } from '../skeleton/Skeleton';
import { imageVariants, imageWrapperVariants } from './image.variants';
import { useImage } from './use-image';

interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc: string;
  width: number;
  height: number;
  wrapperClassName?: string;
  asChild?: boolean;
}

export const Image: FC<ImageProps> = ({
  src,
  fallbackSrc,
  className,
  wrapperClassName,
  asChild,
  ...props
}) => {
  const Comp = asChild ? Slot : 'div';
  const { errorHandler, isError, isLoading, loadHandler, ref } = useImage({
    onError: props.onError,
    onLoad: props.onLoad,
  });

  return (
    <Comp className={imageWrapperVariants({ className: wrapperClassName })}>
      <Skeleton isLoaded={!isLoading}>
        <NextImage
          className={imageVariants({
            className,
            isVisible: !isLoading,
          })}
          src={isError ? fallbackSrc : src}
          {...props}
          width={props.width}
          height={props.width}
          onLoad={loadHandler}
          onError={errorHandler}
          ref={ref}
        />
      </Skeleton>
    </Comp>
  );
};
