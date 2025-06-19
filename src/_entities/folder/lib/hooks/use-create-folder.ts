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
import { invalidateFolderListQueries } from '../utils/invalidate-folder-list-queries';

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
    onMutate: variables => {
      onMutate?.(variables);

      cancelFolderListQueries(queryClient);
    },
    onSuccess: (newFolder, variables, context) => {
      onSuccess?.(newFolder, variables, context);

      queryClient.setQueriesData<PaginatedResult<Folder>>(
        { queryKey: [FolderQueryKeys.LIST] },
        old => {
          if (!old) return old;

          return {
            ...old,
            list: [
              {
                ...newFolder,
                createdAt: new Date(newFolder.createdAt),
                updatedAt: new Date(newFolder.updatedAt),
                size: BigInt(newFolder.size),
              },
              ...old.list.slice(0, old.meta.perPage - 1),
            ],
            meta: {
              ...old.meta,
              total: old.meta.total + 1,
            },
          };
        }
      );

      queryClient.setQueriesData<InfiniteData<PaginatedResult<Folder>>>(
        { queryKey: [FolderQueryKeys.INFINITE] },
        old => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page, index) => {
              if (index === 0) {
                return {
                  ...page,
                  list: [
                    {
                      ...newFolder,
                      createdAt: new Date(newFolder.createdAt),
                      updatedAt: new Date(newFolder.updatedAt),
                      size: BigInt(newFolder.size),
                    },
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
    },
    onSettled: async (data, error, variables, context) => {
      onSettled?.(data, error, variables, context);

      invalidateFolderListQueries(queryClient);
    },
    ...options,
  });
};
