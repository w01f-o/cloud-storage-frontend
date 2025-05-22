import { MAX_USER_NAME_LENGTH, MIN_USER_NAME_LENGTH } from '@/_shared/model';
import { createTranslator, Messages } from 'next-intl';
import { z } from 'zod';

export const changeUserNameSchema = (
  t: ReturnType<typeof createTranslator<Messages, 'SettingsPage.account.name'>>
) =>
  z.object({
    name: z
      .string()
      .min(MIN_USER_NAME_LENGTH, {
        message: t('errors.minLength', {
          minLength: String(MIN_USER_NAME_LENGTH),
        }),
      })
      .max(MAX_USER_NAME_LENGTH, {
        message: t('errors.maxLength', {
          maxLength: String(MAX_USER_NAME_LENGTH),
        }),
      }),
  });

export type ChangeUserNameFormSchema = z.infer<
  ReturnType<typeof changeUserNameSchema>
>;
