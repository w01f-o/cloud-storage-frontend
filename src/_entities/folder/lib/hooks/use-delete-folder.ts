import { MutationHookOptions, PaginatedResult } from '@/_shared/model';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { deleteFolder } from '../../api/requests';
import { FolderQueryKeys } from '../../model';
import { FolderMutationKeys } from '../../model/enums/mutation-keys.enum';
import { Folder } from '../../model/types/folder.type';
import { cancelFolderListQueries } from '../utils/cancel-folder-list-queries';
import { cancelFolderQueries } from '../utils/cancel-folder-queries';
import { invalidateFolderListQueries } from '../utils/invalidate-folder-list-queries';

interface UseDeleteFolderParams {
  id: Folder['id'];
}

export const useDeleteFolder = ({
  onError,
  onSettled,
  onMutate,
  ...options
}: MutationHookOptions<Folder, UseDeleteFolderParams, AxiosError> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<Folder, AxiosError, UseDeleteFolderParams>({
    mutationFn: ({ id }) => deleteFolder(id),
    mutationKey: [FolderMutationKeys.DELETE],
    onMutate: async ({ id }) => {
      onMutate?.({ id });

      await Promise.all([
        cancelFolderListQueries(queryClient),
        cancelFolderQueries(queryClient, id),
      ]);

      const previousFolderList = queryClient.getQueriesData<
        PaginatedResult<Folder> | undefined
      >({
        predicate: query =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === FolderQueryKeys.LIST,
      });
      const previousFolderInfiniteList = queryClient.getQueriesData<
        InfiniteData<PaginatedResult<Folder>>
      >({
        predicate: query =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === FolderQueryKeys.INFINITE,
      });
      const previousFolder = queryClient.getQueriesData<Folder | undefined>({
        queryKey: [FolderQueryKeys.FIND_ONE, id],
      });

      queryClient.removeQueries({
        queryKey: [FolderQueryKeys.FIND_ONE, id],
      });
      queryClient.setQueriesData(
        {
          predicate: query =>
            Array.isArray(query.queryKey) &&
            query.queryKey[0] === FolderQueryKeys.LIST,
        },
        (
          old: PaginatedResult<Folder> | undefined
        ): PaginatedResult<Folder> | undefined => {
          if (!old) return old;

          return {
            ...old,
            list: old.list.filter(folder => folder.id !== id),
          };
        }
      );
      queryClient.setQueriesData(
        {
          predicate: query =>
            Array.isArray(query.queryKey) &&
            query.queryKey[0] === FolderQueryKeys.INFINITE,
        },
        (old: InfiniteData<PaginatedResult<Folder>> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              list: page.list.filter(folder => folder.id !== id),
            })),
          };
        }
      );

      return { previousFolderList, previousFolderInfiniteList, previousFolder };
    },
    onSettled: async (data, error, variables, context) => {
      await invalidateFolderListQueries(queryClient);

      onSettled?.(data, error, variables, context);
    },
    onError: (error, id, context) => {
      if (
        context instanceof Object &&
        'previousFolder' in context &&
        'previousFolderList' in context &&
        'previousFolderInfiniteList' in context
      ) {
        queryClient.setQueriesData(
          {
            predicate: query =>
              Array.isArray(query.queryKey) &&
              query.queryKey[0] === FolderQueryKeys.LIST,
          },
          context.previousFolderList
        );
        queryClient.setQueriesData(
          {
            predicate: query =>
              Array.isArray(query.queryKey) &&
              query.queryKey[0] === FolderQueryKeys.INFINITE,
          },
          context.previousFolderInfiniteList
        );
        queryClient.setQueriesData(
          { queryKey: [FolderQueryKeys.FIND_ONE, id] },
          context.previousFolder
        );
      }

      onError?.(error, id, context);
    },
    ...options,
  });
};
