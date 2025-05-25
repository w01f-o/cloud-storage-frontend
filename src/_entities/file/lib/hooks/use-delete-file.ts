import {
  invalidateSharedFileListQueries,
  SharedFile,
  SharedFileQueryKeys,
} from '@/_entities/shared-file';
import { MutationHookOptions, PaginatedResult } from '@/_shared/model';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { deleteFile } from '../../api/requests';
import { FileMutationKeys } from '../../model/enums/mutation-keys.enum';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';
import { File } from '../../model/types/file.type';
import { cancelFileListQueries } from '../utils/cancel-file-list-queries';
import { cancelFileQueries } from '../utils/cancel-file-queries';
import { invalidateFileListQueries } from '../utils/invalidate-file-list-queries';

interface UseDeleteFileParams {
  id: File['id'];
}

export const useDeleteFile = ({
  onError,
  onSettled,
  onMutate,
  ...options
}: MutationHookOptions<File, UseDeleteFileParams, AxiosError> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<File, AxiosError, UseDeleteFileParams>({
    mutationFn: ({ id }) => deleteFile(id),
    mutationKey: [FileMutationKeys.DELETE],
    onMutate: async ({ id }) => {
      onMutate?.({ id });

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

      queryClient.removeQueries({
        queryKey: [FileQueryKeys.FIND_ONE, id],
      });
      queryClient.removeQueries({
        queryKey: [SharedFileQueryKeys.FIND_ONE, id],
      });
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
            list: old.list.filter(file => file.id !== id),
          };
        }
      );
      queryClient.setQueriesData(
        {
          predicate: query =>
            Array.isArray(query.queryKey) &&
            query.queryKey[0] === FileQueryKeys.INFINITE_FOLDER_LIST,
        },
        (old: InfiniteData<PaginatedResult<File>> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              list: page.list.filter(file => file.id !== id),
            })),
          };
        }
      );
      queryClient.setQueriesData(
        {
          predicate: query =>
            Array.isArray(query.queryKey) &&
            query.queryKey[0] === SharedFileQueryKeys.LIST,
        },
        (old: PaginatedResult<SharedFile> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            list: old.list.filter(file => file.file.id !== id),
          };
        }
      );

      return { previousFileList, previousFile, previousInfiniteFolderFileList };
    },
    onSettled: (data, error, variables, context) => {
      invalidateFileListQueries(queryClient);
      invalidateSharedFileListQueries(queryClient);

      onSettled?.(data, error, variables, context);
    },
    onError: (error, id, context) => {
      if (
        context instanceof Object &&
        'previousFile' in context &&
        'previousFileList' in context &&
        'previousInfiniteFolderFileList' in context
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
          { queryKey: [FileQueryKeys.FIND_ONE, id] },
          context.previousFile
        );
      }

      onError?.(error, id, context);
    },
    ...options,
  });
};
