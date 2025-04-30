import { useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

interface UseInfiniteScrollProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  threshold?: number;
  rootMargin?: string;
}

export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 0.5,
  rootMargin,
}: UseInfiniteScrollProps) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold,
    rootMargin,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return ref;
};
