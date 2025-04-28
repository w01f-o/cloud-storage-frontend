import { MutationHookOptions } from '@/_shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { deleteFolder } from '../../api/requests';
import { FolderMutationKeys } from '../../model/enums/mutation-keys.enum';
import { Folder } from '../../model/types/folder.type';

export const useDeleteFolder = (
  options?: MutationHookOptions<Folder, { id: string }, AxiosError>
) => {
  const { onMutate, onSettled } = options ?? {};
  const queryClient = useQueryClient();

  return useMutation<Folder, AxiosError, { id: string }>({
    mutationFn: ({ id }) => deleteFolder(id),
    mutationKey: [FolderMutationKeys.DELETE],
    onMutate: async ({ id }) => {
      onMutate?.({ id });
    },
    onSettled: async (data, error, { id }, context) => {
      onSettled?.(data, error, { id }, context);
    },
  });
};
