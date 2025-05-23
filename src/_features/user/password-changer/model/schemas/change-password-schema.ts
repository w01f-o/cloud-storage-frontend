import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@/_shared/model';
import { createTranslator, Messages } from 'next-intl';
import { z } from 'zod';

export const changePasswordSchema = (
  t: ReturnType<
    typeof createTranslator<Messages, 'SettingsPage.account.password'>
  >
) =>
  z
    .object({
      currentPassword: z
        .string()
        .min(MIN_PASSWORD_LENGTH, {
          message: t('errors.minLength', {
            minLength: String(MIN_PASSWORD_LENGTH),
          }),
        })
        .max(MAX_PASSWORD_LENGTH, {
          message: t('errors.maxLength', {
            maxLength: String(MAX_PASSWORD_LENGTH),
          }),
        }),
      newPassword: z
        .string()
        .min(MIN_PASSWORD_LENGTH, {
          message: t('errors.minLength', {
            minLength: String(MIN_PASSWORD_LENGTH),
          }),
        })
        .max(MAX_PASSWORD_LENGTH, {
          message: t('errors.maxLength', {
            maxLength: String(MAX_PASSWORD_LENGTH),
          }),
        }),
      confirmPassword: z.string(),
    })
    .refine(
      ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
      {
        message: t('errors.notMatch'),
        path: ['confirmPassword'],
      }
    );

export type ChangePasswordSchema = z.infer<
  ReturnType<typeof changePasswordSchema>
>;
