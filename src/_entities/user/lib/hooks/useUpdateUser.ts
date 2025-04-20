import { AuthQueryKeys, useTokenStore } from '@/entities/auth';
import { MutationHookOptions } from '@/shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { updateUser } from '../../api';
import { User } from '../../model';
import { UpdateUserDto } from '../../model/types/user.type';

const useUpdateUser = (params?: MutationHookOptions<User>) => {
  const { onSettled, onError, ...options } = params ?? {};
  const queryClient = useQueryClient();
  const { accessToken } = useTokenStore();

  return useMutation<User, AxiosError, UpdateUserDto>({
    mutationFn: dto => updateUser(dto),
    onMutate: async ({ avatar, banner, ...dto }) => {
      if (!accessToken) return;

      const previousUser = queryClient.getQueryData<User>([
        AuthQueryKeys.USER,
        accessToken,
      ]);

      if (!previousUser) return;

      await queryClient.cancelQueries({
        queryKey: [AuthQueryKeys.USER, accessToken],
      });

      const optimisticUser: Partial<User> = {
        ...dto,
      };

      if (avatar) {
        optimisticUser.avatar = URL.createObjectURL(avatar);
      }

      if (banner) {
        optimisticUser.banner = URL.createObjectURL(banner);
      }

      queryClient.setQueryData(
        [AuthQueryKeys.USER, accessToken],
        (old: User) => ({
          ...old,
          ...optimisticUser,
        })
      );

      return { previousUser };
    },

    onError(error, variables, context) {
      if (context instanceof Object && 'previousUser' in context) {
        queryClient.setQueryData(
          [AuthQueryKeys.USER, accessToken],
          context.previousUser
        );
      }

      onError?.(error, variables, context);
    },

    onSettled(data, error, variables, context) {
      if (!accessToken) return;

      queryClient.invalidateQueries({
        queryKey: [AuthQueryKeys.USER, accessToken],
      });

      onSettled?.(data, error, variables, context);
    },

    ...options,
  });
};

export { useUpdateUser };
