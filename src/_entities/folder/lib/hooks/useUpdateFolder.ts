import { MutationHookOptions, PaginatedResult } from '@/_shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { updateFolder } from '../../api/requests';
import { FolderQueryKeys } from '../../model';
import { FolderMutationKeys } from '../../model/enums/mutation-keys.enum';
import { Folder, UpdateFolderDto } from '../../model/types/folder.type';
import { cancelFolderListQueries } from '../utils/cancelFolderListQueries';
import { cancelFolderQueries } from '../utils/cancelFolderQueries';
import { invalidateFolderListQueries } from '../utils/invalidateFolderListQueries';
import { invalidateFolderQueries } from '../utils/invalidateFolderQueries';

export const useUpdateFolder = ({
  onMutate,
  onSettled,
  onError,
  ...options
}: MutationHookOptions<
  Folder,
  { id: string; data: UpdateFolderDto },
  AxiosError
> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<Folder, AxiosError, { id: string; data: UpdateFolderDto }>(
    {
      mutationFn: ({ id, data }) => updateFolder(id, data),
      mutationKey: [FolderMutationKeys.UPDATE],
      onMutate: async ({ data, id }) => {
        onMutate?.({ data, id });

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
        const previousFolder = queryClient.getQueriesData<Folder | undefined>({
          queryKey: [FolderQueryKeys.FIND_ONE, id],
        });

        queryClient.setQueriesData(
          {
            queryKey: [FolderQueryKeys.FIND_ONE, id],
          },
          (old: Folder) => ({ ...old, ...data })
        );

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
              list: old.list.map(folder =>
                folder.id === id ? { ...folder, ...data } : folder
              ),
            };
          }
        );

        return {
          previousFolderList,
          previousFolder,
        };
      },
      onSettled: async (data, error, variables, context) => {
        await Promise.all([
          invalidateFolderListQueries(queryClient),
          invalidateFolderQueries(queryClient, variables.id),
        ]);

        onSettled?.(data, error, variables, context);
      },
      onError: (error, variables, context) => {
        if (
          context instanceof Object &&
          'previousFolder' in context &&
          'previousFolderList' in context
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
            { queryKey: [FolderQueryKeys.FIND_ONE, variables.id] },
            context.previousFolder
          );
        }

        onError?.(error, variables, context);
      },
      ...options,
    }
  );
};
