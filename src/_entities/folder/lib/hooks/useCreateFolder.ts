import { MutationHookOptions } from '@/_shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createFolder } from '../../api/requests';
import { FolderMutationKeys } from '../../model/enums/mutation-keys.enum';
import { CreateFolderDto, Folder } from '../../model/types/folder.type';
import { cancelFolderListQueries } from '../utils/cancelFolderListQueries';
import { invalidateFolderListQueries } from '../utils/invalidateFolderListQueries';

export const useCreateFolder = ({
  onMutate,
  onSettled,
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
    onSettled: async (data, error, variables, context) => {
      await invalidateFolderListQueries(queryClient);

      onSettled?.(data, error, variables, context);
    },
    ...options,
  });
};
