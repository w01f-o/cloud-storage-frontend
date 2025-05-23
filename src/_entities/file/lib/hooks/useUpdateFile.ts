import { invalidateSharedFileListQueries } from '@/_entities/shared-file/lib/utils/invalidate-shared-file-list-queries';
import { invalidateSharedFileQueries } from '@/_entities/shared-file/lib/utils/invalidate-shared-file-queries';
import { SharedFileQueryKeys } from '@/_entities/shared-file/model/enums/query-keys.enum';
import { SharedFile } from '@/_entities/shared-file/model/types/shared-file.type';
import { MutationHookOptions, PaginatedResult } from '@/_shared/model';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { updateFile } from '../../api/requests';
import { FileMutationKeys } from '../../model/enums/mutation-keys.enum';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';
import { File, UpdateFileDto } from '../../model/types/file.type';
import { cancelFileListQueries } from '../utils/cancelFileListQueries';
import { cancelFileQueries } from '../utils/cancelFileQueries';
import { invalidateFileListQueries } from '../utils/invalidateFileListQueries';
import { invalidateFileQueries } from '../utils/invalidateFileQueries';

export const useUpdateFile = ({
  onSettled,
  onError,
  ...options
}: MutationHookOptions<
  File,
  { id: string; data: UpdateFileDto },
  AxiosError
> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<File, AxiosError, { id: string; data: UpdateFileDto }>({
    mutationFn: ({ id, data }) => updateFile(id, data),
    mutationKey: [FileMutationKeys.UPDATE],
    onMutate: async ({ id, data }) => {
      await Promise.all([
        cancelFileListQueries(queryClient),
        cancelFileQueries(queryClient, id),
      ]);

      const previousFileList = queryClient.getQueriesData<
        PaginatedResult<File> | undefined
      >({
        predicate: query =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === FileQueryKeys.LIST,
      });
      const previousInfiniteFolderFileList = queryClient.getQueriesData<
        InfiniteData<PaginatedResult<File>> | undefined
      >({
        predicate: query =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === FileQueryKeys.INFINITE_FOLDER_LIST,
      });
      const previousFile = queryClient.getQueriesData<File | undefined>({
        queryKey: [FileQueryKeys.FIND_ONE, id],
      });
      const previousSharedFileList = queryClient.getQueriesData<
        PaginatedResult<SharedFile> | undefined
      >({
        predicate: query =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === SharedFileQueryKeys.LIST,
      });
      const previousSharedFile = queryClient.getQueriesData<
        SharedFile | undefined
      >({
        queryKey: [SharedFileQueryKeys.FIND_ONE, id],
      });

      queryClient.setQueriesData(
        {
          queryKey: [FileQueryKeys.FIND_ONE, id],
        },
        (old: File) => ({ ...old, ...data })
      );

      queryClient.setQueriesData(
        {
          predicate: query =>
            Array.isArray(query.queryKey) &&
            query.queryKey[0] === FileQueryKeys.INFINITE_FOLDER_LIST,
        },
        (
          old: InfiniteData<PaginatedResult<File>> | undefined
        ): InfiniteData<PaginatedResult<File>> | undefined => {
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

      queryClient.setQueriesData(
        {
          predicate: query =>
            Array.isArray(query.queryKey) &&
            query.queryKey[0] === FileQueryKeys.LIST,
        },
        (
          old: PaginatedResult<File> | undefined
        ): PaginatedResult<File> | undefined => {
          if (!old) return old;

          return {
            ...old,
            list: old.list.map(file =>
              file.id === id ? { ...file, ...data } : file
            ),
          };
        }
      );

      queryClient.setQueriesData(
        {
          predicate: query =>
            Array.isArray(query.queryKey) &&
            query.queryKey[0] === SharedFileQueryKeys.LIST,
        },
        (
          old: PaginatedResult<SharedFile> | undefined
        ): PaginatedResult<SharedFile> | undefined => {
          if (!old) return old;

          return {
            ...old,
            list: old.list.map(file =>
              file.file.id === id
                ? { ...file, file: { ...file.file, ...data } }
                : file
            ),
          };
        }
      );

      queryClient.setQueriesData(
        {
          queryKey: [SharedFileQueryKeys.FIND_ONE, id],
        },
        (old: SharedFile | undefined): SharedFile | undefined => {
          if (!old) return old;

          return {
            ...old,
            file: { ...old.file, ...data },
          };
        }
      );

      return {
        previousFileList,
        previousFile,
        previousInfiniteFolderFileList,
        previousSharedFileList,
        previousSharedFile,
      };
    },
    onSettled: (data, error, variables, context) => {
      invalidateFileListQueries(queryClient);
      invalidateFileQueries(queryClient, variables.id);
      invalidateSharedFileListQueries(queryClient);
      invalidateSharedFileQueries(queryClient, variables.id);

      onSettled?.(data, error, variables, context);
    },
    onError: (error, variables, context) => {
      if (
        context instanceof Object &&
        'previousFile' in context &&
        'previousFileList' in context &&
        'previousInfiniteFolderFileList' in context &&
        'previousSharedFileList' in context &&
        'previousSharedFile' in context
      ) {
        queryClient.setQueriesData(
          {
            predicate: query =>
              Array.isArray(query.queryKey) &&
              query.queryKey[0] === FileQueryKeys.LIST,
          },
          context.previousFileList
        );
        queryClient.setQueriesData(
          { queryKey: [FileQueryKeys.FIND_ONE, variables.id] },
          context.previousFile
        );
        queryClient.setQueriesData(
          {
            predicate: query =>
              Array.isArray(query.queryKey) &&
              query.queryKey[0] === SharedFileQueryKeys.LIST,
          },
          context.previousSharedFileList
        );
        queryClient.setQueriesData(
          { queryKey: [SharedFileQueryKeys.FIND_ONE, variables.id] },
          context.previousSharedFile
        );
        // TODO: FIX
        // queryClient.setQueriesData(
        //   {
        //     predicate: query =>
        //       Array.isArray(query.queryKey) &&
        //       query.queryKey[0] === FileQueryKeys.INFINITE_FOLDER_LIST,
        //   },
        //   context.previousInfiniteFolderFileList
        // );
      }

      onError?.(error, variables, context);
    },
    ...options,
  });
};
