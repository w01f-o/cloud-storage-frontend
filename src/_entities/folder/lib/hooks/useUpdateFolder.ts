import { MutationHookOptions } from '@/_shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { updateFolder } from '../../api/requests';
import { FolderMutationKeys } from '../../model/enums/mutation-keys.enum';
import { Folder, UpdateFolderDto } from '../../model/types/folder.type';

export const useUpdateFolder = (
  options?: MutationHookOptions<
    Folder,
    { id: string; data: UpdateFolderDto },
    AxiosError
  >
) => {
  const { onMutate, onSettled } = options ?? {};
  const queryClient = useQueryClient();

  return useMutation<Folder, AxiosError, { id: string; data: UpdateFolderDto }>(
    {
      mutationFn: ({ id, data }) => updateFolder(id, data),
      mutationKey: [FolderMutationKeys.UPDATE],
      onMutate: async variables => {
        onMutate?.(variables);
      },
      onSettled: async (data, error, variables, context) => {
        onSettled?.(data, error, variables, context);
      },
    }
  );
};
