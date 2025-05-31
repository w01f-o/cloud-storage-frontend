import { MutationHookOptions, PaginatedResult } from '@/_shared/model';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { updateFolder } from '../../api/requests';
import { FolderQueryKeys } from '../../model';
import { FolderMutationKeys } from '../../model/enums/mutation-keys.enum';
import { Folder, UpdateFolderDto } from '../../model/types/folder.type';
import { cancelFolderListQueries } from '../utils/cancel-folder-list-queries';
import { cancelFolderQueries } from '../utils/cancel-folder-queries';
import { getPreviousFolderQueries } from '../utils/get-previous-folders-queries';
import { invalidateFolderListQueries } from '../utils/invalidate-folder-list-queries';
import { invalidateFolderQueries } from '../utils/invalidate-folder-queries';

interface UpdateFolderParams {
  id: Folder['id'];
  data: UpdateFolderDto;
}

interface UpdateFolderContext {
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

export const useUpdateFolder = ({
  onMutate,
  onSettled,
  onError,
  ...options
}: MutationHookOptions<Folder, UpdateFolderParams, AxiosError> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<
    Folder,
    AxiosError,
    UpdateFolderParams,
    Partial<UpdateFolderContext>
  >({
    mutationFn: ({ id, data }) => updateFolder(id, data),
    mutationKey: [FolderMutationKeys.UPDATE],
    onMutate: async ({ data, id }) => {
      onMutate?.({ data, id });

      await Promise.all([
        cancelFolderListQueries(queryClient),
        cancelFolderQueries(queryClient, id),
      ]);

      const { previousFolder, previousFolderInfiniteList, previousFolderList } =
        getPreviousFolderQueries(queryClient, id);

      queryClient.setQueriesData<Folder>(
        {
          queryKey: [FolderQueryKeys.FIND_ONE, id],
        },
        old => {
          if (!old) return old;

          return { ...old, ...data };
        }
      );

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
            list: old.list.map(folder =>
              folder.id === id ? { ...folder, ...data } : folder
            ),
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
              list: page.list.map(folder =>
                folder.id === id ? { ...folder, ...data } : folder
              ),
            })),
          };
        }
      );

      return {
        previousFolderList,
        previousFolderInfiniteList,
        previousFolder,
      };
    },
    onSettled: (data, error, variables, context) => {
      onSettled?.(data, error, variables, context);

      Promise.all([
        invalidateFolderListQueries(queryClient),
        invalidateFolderQueries(queryClient, variables.id),
      ]);
    },
    onError: (error, variables, context) => {
      onError?.(error, variables, context);

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
        { queryKey: [FolderQueryKeys.FIND_ONE, variables.id] },
        context.previousFolder
      );
    },
    ...options,
  });
};
