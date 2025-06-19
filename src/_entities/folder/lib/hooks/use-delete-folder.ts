import { invalidateSharedFileListQueries } from '@/_entities/shared-file';
import { StorageQueryKeys } from '@/_entities/storage/model/enums/storage-query-keys.enum';
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
import { getPreviousFolderQueries } from '../utils/get-previous-folders-queries';
import { invalidateFolderListQueries } from '../utils/invalidate-folder-list-queries';

interface UseDeleteFolderParams {
  id: Folder['id'];
}

interface DeleteFolderContext {
  previousFolder: [readonly unknown[], Folder | undefined][];
  previousFolderInfiniteList: [
    readonly unknown[],
    InfiniteData<PaginatedResult<Folder>, unknown> | undefined,
  ][];
  previousFolderList: [
    readonly unknown[],
    PaginatedResult<Folder> | undefined,
  ][];
}

export const useDeleteFolder = ({
  onError,
  onSettled,
  onMutate,
  ...options
}: MutationHookOptions<Folder, UseDeleteFolderParams, AxiosError> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<
    Folder,
    AxiosError,
    UseDeleteFolderParams,
    DeleteFolderContext
  >({
    mutationFn: ({ id }) => deleteFolder(id),
    mutationKey: [FolderMutationKeys.DELETE],
    onMutate: async ({ id }) => {
      onMutate?.({ id });

      await Promise.all([
        cancelFolderListQueries(queryClient),
        cancelFolderQueries(queryClient, id),
      ]);

      const { previousFolder, previousFolderInfiniteList, previousFolderList } =
        getPreviousFolderQueries(queryClient, id);

      queryClient.removeQueries({
        queryKey: [FolderQueryKeys.FIND_ONE, id],
      });

      queryClient.setQueriesData<PaginatedResult<Folder>>(
        {
          predicate: query =>
            Array.isArray(query.queryKey) &&
            query.queryKey[0] === FolderQueryKeys.LIST,
        },
        old => {
          if (!old) return old;

          return {
            ...old,
            list: old.list.filter(folder => folder.id !== id),
          };
        }
      );

      queryClient.setQueriesData<InfiniteData<PaginatedResult<Folder>>>(
        {
          predicate: query =>
            Array.isArray(query.queryKey) &&
            query.queryKey[0] === FolderQueryKeys.INFINITE,
        },
        old => {
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
    onSettled: (data, error, variables, context) => {
      onSettled?.(data, error, variables, context);

      invalidateFolderListQueries(queryClient);
      invalidateSharedFileListQueries(queryClient);
      queryClient.invalidateQueries({ queryKey: [StorageQueryKeys.USER] });
    },
    onError: (error, id, context) => {
      onError?.(error, id, context);

      if (!context) return;

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
    },
    ...options,
  });
};
