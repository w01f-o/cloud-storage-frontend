import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

interface UseInfiniteScrollProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<unknown[], unknown>>;
  threshold?: number;
}

export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 0.5,
}: UseInfiniteScrollProps) => {
  const lockRef = useRef(false);

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold,
  });

  useEffect(() => {
    if (
      isIntersecting &&
      hasNextPage &&
      !isFetchingNextPage &&
      !lockRef.current
    ) {
      lockRef.current = true;
      fetchNextPage().finally(() => {
        setTimeout(() => {
          lockRef.current = false;
        }, 500);
      });
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return ref;
};
