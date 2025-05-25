import { MutationHookOptions, PaginatedResult } from '@/_shared/model';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createFolder } from '../../api/requests';
import { FolderMutationKeys } from '../../model/enums/mutation-keys.enum';
import { FolderQueryKeys } from '../../model/enums/query-keys.enum';
import { CreateFolderDto, Folder } from '../../model/types/folder.type';
import { cancelFolderListQueries } from '../utils/cancel-folder-list-queries';

export const useCreateFolder = ({
  onMutate,
  onSettled,
  onSuccess,
  ...options
}: MutationHookOptions<Folder, CreateFolderDto, AxiosError> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<Folder, AxiosError, CreateFolderDto>({
    mutationFn: createFolder,
    mutationKey: [FolderMutationKeys.CREATE],
    onMutate: async variables => {
      await cancelFolderListQueries(queryClient);

      onMutate?.(variables);
    },
    onSuccess: (newFolder, variables, context) => {
      queryClient.setQueriesData(
        { queryKey: [FolderQueryKeys.LIST] },
        (old: PaginatedResult<Folder> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            list: [newFolder, ...old.list.slice(0, old.meta.perPage - 1)],
            meta: {
              ...old.meta,
              total: old.meta.total + 1,
            },
          };
        }
      );

      queryClient.setQueriesData(
        { queryKey: [FolderQueryKeys.INFINITE] },
        (old: InfiniteData<PaginatedResult<Folder>> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page, index) => {
              if (index === 0) {
                return {
                  ...page,
                  list: [
                    newFolder,
                    ...page.list.slice(0, page.meta.perPage - 1),
                  ],
                  meta: {
                    ...page.meta,
                    total: page.meta.total + 1,
                  },
                };
              }

              return page;
            }),
          };
        }
      );

      onSuccess?.(newFolder, variables, context);
    },
    onSettled: async (data, error, variables, context) => {
      // await invalidateFolderListQueries(queryClient);

      onSettled?.(data, error, variables, context);
    },
    ...options,
  });
};
