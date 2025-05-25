import {
  invalidateSharedFileListQueries,
  SharedFile,
  SharedFileQueryKeys,
} from '@/_entities/shared-file';
import { StorageQueryKeys } from '@/_entities/storage/model/enums/storage-query-keys.enum';
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
import { getPreviousFileQueries } from '../utils/get-previous-file-queries';
import { invalidateFileListQueries } from '../utils/invalidate-file-list-queries';

interface UseDeleteFileParams {
  id: File['id'];
}

interface UseDeleteFileContext {
  previousFile: [readonly unknown[], globalThis.File | undefined][];
  previousFileList: [
    readonly unknown[],
    PaginatedResult<globalThis.File> | undefined,
  ][];
  previousSharedFile: [readonly unknown[], File | undefined][];
  previousSharedFileList: [
    readonly unknown[],
    PaginatedResult<File> | undefined,
  ][];
}

export const useDeleteFile = ({
  onError,
  onSettled,
  onMutate,
  ...options
}: MutationHookOptions<File, UseDeleteFileParams, AxiosError> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<
    File,
    AxiosError,
    UseDeleteFileParams,
    UseDeleteFileContext
  >({
    mutationFn: ({ id }) => deleteFile(id),
    mutationKey: [FileMutationKeys.DELETE],
    onMutate: async ({ id }) => {
      onMutate?.({ id });

      await Promise.all([
        cancelFileListQueries(queryClient),
        cancelFileQueries(queryClient, id),
      ]);

      const {
        previousFile,
        previousFileList,
        previousSharedFile,
        previousSharedFileList,
      } = getPreviousFileQueries(queryClient, id);

      queryClient.removeQueries({
        queryKey: [FileQueryKeys.FIND_ONE, id],
      });
      queryClient.removeQueries({
        queryKey: [SharedFileQueryKeys.FIND_ONE, id],
      });
      queryClient.setQueriesData<PaginatedResult<File>>(
        {
          predicate: query =>
            Array.isArray(query.queryKey) &&
            query.queryKey[0] === FileQueryKeys.LIST,
        },
        old => {
          if (!old) return old;

          return {
            ...old,
            list: old.list.filter(file => file.id !== id),
          };
        }
      );
      queryClient.setQueriesData<InfiniteData<PaginatedResult<File>>>(
        {
          predicate: query =>
            Array.isArray(query.queryKey) &&
            query.queryKey[0] === FileQueryKeys.INFINITE_FOLDER_LIST,
        },
        old => {
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
      queryClient.setQueriesData<PaginatedResult<SharedFile>>(
        {
          predicate: query =>
            Array.isArray(query.queryKey) &&
            query.queryKey[0] === SharedFileQueryKeys.LIST,
        },
        old => {
          if (!old) return old;

          return {
            ...old,
            list: old.list.filter(file => file.id !== id),
          };
        }
      );

      return {
        previousFileList,
        previousFile,
        previousSharedFile,
        previousSharedFileList,
      };
    },
    onSettled: (data, error, variables, context) => {
      onSettled?.(data, error, variables, context);

      invalidateFileListQueries(queryClient);
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
            query.queryKey[0] === SharedFileQueryKeys.LIST,
        },
        context.previousSharedFileList
      );
      queryClient.setQueriesData(
        { queryKey: [SharedFileQueryKeys.FIND_ONE, id] },
        context.previousSharedFile
      );
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
    },
    ...options,
  });
};
