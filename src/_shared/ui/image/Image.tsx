'use client';

import NextImage from 'next/image';
import {
  ComponentPropsWithoutRef,
  ElementType,
  HTMLAttributes,
  SyntheticEvent,
  useRef,
  useState,
} from 'react';
import { Skeleton } from '../skeleton/Skeleton';
import { imageVariants, imageWrapperVariants } from './image.variants';

interface ImageProps<T extends ElementType = 'div'> extends HTMLAttributes<T> {
  src: string;
  alt: string;
  fallbackSrc: string;
  width: number;
  height: number;
  wrapperClassName?: string;
  as?: T;
}

const Image = <T extends ElementType = 'div'>({
  src,
  fallbackSrc,
  className,
  wrapperClassName,
  as,
  ...props
}: ImageProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ImageProps<T>>) => {
  const Tag = as || 'div';

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const ref = useRef<HTMLImageElement>(null);

  const loadHandler = async (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    props.onLoad?.(e);
  };

  const errorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setIsError(true);
    props.onError?.(e);
  };

  return (
    <Tag className={imageWrapperVariants({ className: wrapperClassName })}>
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
    </Tag>
  );
};

export { Image };
