import { AuthQueryKeys } from '@/_entities/auth';
import { MutationHookOptions } from '@/_shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { updateUser } from '../../api/requests';
import { MutationUserKeys } from '../../model/enums/mutation-keys.enum';
import { UpdateUserDto, User } from '../../model/types/user.type';

interface UseUpdateUserContext {
  previousUser?: [readonly unknown[], User | undefined][];
}

export const useUpdateUser = ({
  onMutate,
  onSettled,
  onError,
  ...options
}: MutationHookOptions<User, UpdateUserDto, AxiosError> = {}) => {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError, UpdateUserDto, UseUpdateUserContext>({
    mutationFn: updateUser,
    mutationKey: [MutationUserKeys.UPDATE],
    onMutate: async data => {
      onMutate?.(data);

      await queryClient.cancelQueries({
        queryKey: [AuthQueryKeys.CURRENT_SESSION],
      });

      if (data.email || data.name) {
        const previousUser = queryClient.getQueriesData<User>({
          queryKey: [AuthQueryKeys.CURRENT_SESSION],
        });

        queryClient.setQueriesData<User>(
          {
            queryKey: [AuthQueryKeys.CURRENT_SESSION],
          },
          old => {
            if (!old) return old;

            return {
              ...old,
              email: data.email ?? old.email,
              name: data.name ?? old.name,
            };
          }
        );

        return { previousUser };
      }
    },
    onSettled: (data, error, variables, context) => {
      onSettled?.(data, error, variables, context);

      queryClient.invalidateQueries({
        queryKey: [AuthQueryKeys.CURRENT_SESSION],
      });
    },
    onError: (error, variables, context) => {
      onError?.(error, variables, context);

      if (!context) return;

      queryClient.setQueriesData(
        {
          queryKey: [AuthQueryKeys.CURRENT_SESSION],
        },
        context.previousUser
      );
    },
    ...options,
  });
};
