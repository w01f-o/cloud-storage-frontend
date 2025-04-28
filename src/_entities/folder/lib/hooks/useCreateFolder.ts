import { MutationHookOptions } from '@/_shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createFolder } from '../../api/requests';
import { FolderMutationKeys } from '../../model/enums/mutation-keys.enum';
import { CreateFolderDto, Folder } from '../../model/types/folder.type';

export const useCreateFolder = (
  options?: MutationHookOptions<Folder, CreateFolderDto, AxiosError>
) => {
  const { onMutate, onSettled } = options ?? {};
  const queryClient = useQueryClient();

  return useMutation<Folder, AxiosError, CreateFolderDto>({
    mutationFn: createFolder,
    mutationKey: [FolderMutationKeys.CREATE],
    onMutate: async variables => {
      onMutate?.(variables);
    },
    onSettled: async (data, error, variables, context) => {
      onSettled?.(data, error, variables, context);
    },
  });
};
