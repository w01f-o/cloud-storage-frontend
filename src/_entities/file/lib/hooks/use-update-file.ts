import {
  invalidateSharedFileListQueries,
  invalidateSharedFileQueries,
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
import { updateFile } from '../../api/requests';
import { FileMutationKeys, FileQueryKeys } from '../../model/enums';
import { File, UpdateFileDto } from '../../model/types/file.type';
import { cancelFileListQueries } from '../utils/cancel-file-list-queries';
import { cancelFileQueries } from '../utils/cancel-file-queries';
import { getPreviousFileQueries } from '../utils/get-previous-file-queries';
import { invalidateFileListQueries } from '../utils/invalidate-file-list-queries';
import { invalidateFileQueries } from '../utils/invalidate-file-queries';

interface UseUpdateFileParams {
  id: File['id'];
  data: UpdateFileDto;
}

interface UseUpdateFileContext {
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

export const useUpdateFile = ({
  onSettled,
  onMutate,
  onError,
  ...options
}: MutationHookOptions<File, UseUpdateFileParams, AxiosError> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<
    File,
    AxiosError,
    UseUpdateFileParams,
    UseUpdateFileContext
  >({
    mutationFn: ({ id, data }) => updateFile(id, data),
    mutationKey: [FileMutationKeys.UPDATE],
    onMutate: async ({ id, data }) => {
      onMutate?.({ id, data });

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

      queryClient.setQueriesData<File>(
        {
          queryKey: [FileQueryKeys.FIND_ONE, id],
        },
        old => {
          if (!old) return old;

          return { ...old, ...data };
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
              list: page.list.map(folder =>
                folder.id === id ? { ...folder, ...data } : folder
              ),
            })),
          };
        }
      );

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
            list: old.list.map(file =>
              file.id === id ? { ...file, ...data } : file
            ),
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
            list: old.list.map(file =>
              file.id === id ? { ...file, ...data } : file
            ),
          };
        }
      );

      queryClient.setQueriesData<SharedFile>(
        {
          queryKey: [SharedFileQueryKeys.FIND_ONE, id],
        },
        old => {
          if (!old) return old;

          return {
            ...old,
            ...data,
          };
        }
      );

      return {
        previousFileList,
        previousFile,
        previousSharedFileList,
        previousSharedFile,
      };
    },
    onSettled: (data, error, variables, context) => {
      onSettled?.(data, error, variables, context);

      invalidateFileListQueries(queryClient);
      invalidateFileQueries(queryClient, variables.id);
      invalidateSharedFileListQueries(queryClient);
      invalidateSharedFileQueries(queryClient, variables.id);
    },
    onError: (error, variables, context) => {
      onError?.(error, variables, context);

      if (!context) return;

      queryClient.setQueriesData(
        {
          predicate: query =>
            Array.isArray(query.queryKey) &&
            query.queryKey[0] === FileQueryKeys.LIST,
        },
        context.previousFileList
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
      queryClient.setQueriesData(
        { queryKey: [FileQueryKeys.FIND_ONE, variables.id] },
        context.previousFile
      );
    },
    ...options,
  });
};
