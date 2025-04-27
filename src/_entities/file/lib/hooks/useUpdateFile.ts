import { MutationHookOptions, PaginatedResult } from '@/_shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { updateFile } from '../../api/requests';
import { MutationFileKeys } from '../../model/enums/mutation-keys.enum';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';
import { File } from '../../model/types/file.type';
import { UpdateFileDto } from '../../model/types/update-file.dto';
import { cancelFileListQueries } from '../utils/cancelFileListQueries';
import { cancelFileQueries } from '../utils/cancelFileQueries';
import { invalidateFileListQueries } from '../utils/invalidateFileListQueries';
import { invalidateFileQueries } from '../utils/invalidateFileQueries';

export const useUpdateFile = (
  options: MutationHookOptions<
    File,
    { id: string; data: UpdateFileDto },
    AxiosError
  >
) => {
  const { onSettled, onError, ...rest } = options ?? {};
  const queryClient = useQueryClient();

  return useMutation<File, AxiosError, { id: string; data: UpdateFileDto }>({
    mutationFn: ({ id, data }) => updateFile(id, data),
    mutationKey: [MutationFileKeys.UPDATE],
    onMutate: async ({ id, data }) => {
      await Promise.all([
        cancelFileListQueries(queryClient),
        cancelFileQueries(queryClient, id),
        queryClient.removeQueries({
          queryKey: [FileQueryKeys.FIND_ONE, id],
        }),
      ]);

      const previousFileList = queryClient.getQueriesData<
        PaginatedResult<File> | undefined
      >({
        predicate: query =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === FileQueryKeys.LIST,
      });
      const previousFile = queryClient.getQueriesData<File | undefined>({
        queryKey: [FileQueryKeys.FIND_ONE, id],
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

      return {
        previousFileList,
        previousFile,
      };
    },
    onSettled: async (data, error, variables, context) => {
      await Promise.all([
        invalidateFileListQueries(queryClient),
        invalidateFileQueries(queryClient, variables.id),
      ]);

      onSettled?.(data, error, variables, context);
    },
    onError: (error, variables, context) => {
      if (
        context instanceof Object &&
        'previousFile' in context &&
        'previousFileList' in context
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
      }

      onError?.(error, variables, context);
    },
    ...rest,
  });
};
