import { AuthQueryKeys } from '@/_entities/auth';
import { MutationHookOptions } from '@/_shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { updateUser } from '../../api/requests';
import { MutationUserKeys } from '../../model/enums/mutation-keys.enum';
import { UpdateUserDto, User } from '../../model/types/user.type';

export const useUpdateUser = (
  options?: MutationHookOptions<User, UpdateUserDto, AxiosError>
) => {
  const { onMutate, onSettled, onError, ...rest } = options ?? {};
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError, UpdateUserDto>({
    mutationFn: updateUser,
    mutationKey: [MutationUserKeys.UPDATE],
    onMutate: async data => {
      onMutate?.(data);

      if (data.email || data.name) {
        await queryClient.cancelQueries({
          queryKey: [AuthQueryKeys.CURRENT_SESSION],
        });

        const previousUser = queryClient.getQueryData<User>([
          AuthQueryKeys.CURRENT_SESSION,
        ]);

        queryClient.setQueriesData(
          {
            queryKey: [AuthQueryKeys.CURRENT_SESSION],
          },
          (old: User): User => ({
            ...old,
            email: data.email ?? old.email,
            name: data.name ?? old.name,
          })
        );

        return { previousUser };
      }
    },
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [AuthQueryKeys.CURRENT_SESSION],
      });

      onSettled?.(data, error, variables, context);
    },
    onError: (error, variables, context) => {
      if (context instanceof Object && 'previousUser' in context) {
        queryClient.setQueriesData(
          {
            queryKey: [AuthQueryKeys.CURRENT_SESSION],
          },
          context.previousUser
        );
      }

      onError?.(error, variables, context);
    },
    ...rest,
  });
};
