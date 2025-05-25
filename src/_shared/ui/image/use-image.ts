import { Ref, SyntheticEvent, useRef, useState } from 'react';

interface UseImageParams {
  onLoad?: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
}

interface UseImageReturn {
  isLoading: boolean;
  isError: boolean;
  ref: Ref<HTMLImageElement>;
  loadHandler: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
  errorHandler: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
}

export const useImage = (params: UseImageParams): UseImageReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const ref = useRef<HTMLImageElement>(null);

  const loadHandler = async (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    params.onLoad?.(e);
  };

  const errorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    setIsError(true);
    params.onError?.(e);
  };

  return {
    isLoading,
    isError,
    ref,
    loadHandler,
    errorHandler,
  };
};
