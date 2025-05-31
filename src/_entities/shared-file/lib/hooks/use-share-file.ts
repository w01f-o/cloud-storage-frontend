import {
  cancelFileListQueries,
  cancelFileQueries,
  File,
  invalidateFileListQueries,
  invalidateFileQueries,
} from '@/_entities/file';
import { MutationHookOptions } from '@/_shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { shareFile } from '../../api/requests';
import { SharedFileMutationKeys } from '../../model/enums/mutation-keys.enum';
import { SharedFile } from '../../model/types/shared-file.type';
import { cancelSharedFileListQueries } from '../utils/cancel-shared-file-list-queries';
import { cancelSharedFileQueries } from '../utils/cancel-shared-file-queries';
import { invalidateSharedFileListQueries } from '../utils/invalidate-shared-file-list-queries';
import { invalidateSharedFileQueries } from '../utils/invalidate-shared-file-queries';

interface ShareFileParams {
  id: File['id'];
  type: 'share' | 'unshare';
}

export const useShareFile = ({
  onSettled,
  onMutate,
  ...options
}: MutationHookOptions<SharedFile, ShareFileParams, AxiosError> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<SharedFile, AxiosError, ShareFileParams>({
    mutationKey: [SharedFileMutationKeys.SHARE],
    mutationFn: ({ id, type }) => shareFile(id, type),
    onMutate: variables => {
      onMutate?.(variables);

      cancelSharedFileListQueries(queryClient);
      cancelSharedFileQueries(queryClient, variables.id);
      cancelFileListQueries(queryClient);
      cancelFileQueries(queryClient, variables.id);
    },
    onSettled: (data, error, variables, context) => {
      onSettled?.(data, error, variables, context);

      invalidateSharedFileListQueries(queryClient);
      invalidateSharedFileQueries(queryClient, variables.id);
      invalidateFileListQueries(queryClient);
      invalidateFileQueries(queryClient, variables.id);
    },
    ...options,
  });
};
