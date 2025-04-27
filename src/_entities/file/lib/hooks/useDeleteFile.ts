import { MutationHookOptions, PaginatedResult } from '@/_shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { deleteFile } from '../../api/requests';
import { MutationFileKeys } from '../../model/enums/mutation-keys.enum';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';
import { File } from '../../model/types/file.type';
import { cancelFileListQueries } from '../utils/cancelFileListQueries';
import { cancelFileQueries } from '../utils/cancelFileQueries';
import { invalidateFileListQueries } from '../utils/invalidateFileListQueries';

export const useDeleteFile = (
  options: MutationHookOptions<File, string, AxiosError>
) => {
  const { onError, onSettled, ...rest } = options ?? {};
  const queryClient = useQueryClient();

  return useMutation<File, AxiosError, string>({
    mutationFn: deleteFile,
    mutationKey: [MutationFileKeys.DELETE],
    onMutate: async id => {
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
      const previousFile = queryClient.getQueriesData<File | undefined>({
        queryKey: [FileQueryKeys.FIND_ONE, id],
      });

      queryClient.removeQueries({
        queryKey: [FileQueryKeys.FIND_ONE, id],
      });
      queryClient.setQueriesData(
        {
          predicate: query =>
            Array.isArray(query.queryKey) &&
            query.queryKey[0] === FileQueryKeys.LIST,
        },
        (old: PaginatedResult<File>) => ({
          ...old,
          data: old.list.filter(file => file.id !== id),
        })
      );

      return { previousFileList, previousFile };
    },
    onSettled: async (data, error, variables, context) => {
      await invalidateFileListQueries(queryClient);

      onSettled?.(data, error, variables, context);
    },
    onError: (error, id, context) => {
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
          { queryKey: [FileQueryKeys.FIND_ONE, id] },
          context.previousFile
        );
      }

      onError?.(error, id, context);
    },
    ...rest,
  });
};
