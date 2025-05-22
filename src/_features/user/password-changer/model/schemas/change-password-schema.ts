import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@/_shared/model';
import { createTranslator, Messages } from 'next-intl';
import { z } from 'zod';

export const changePasswordSchema = (
  t: ReturnType<typeof createTranslator<Messages, 'AuthPage'>>
) =>
  z
    .object({
      currentPassword: z
        .string()
        .min(MIN_PASSWORD_LENGTH, {
          message: t('errors.passwordMinLength', {
            minLength: String(MIN_PASSWORD_LENGTH),
          }),
        })
        .max(MAX_PASSWORD_LENGTH, {
          message: t('errors.passwordMaxLength', {
            maxLength: String(MAX_PASSWORD_LENGTH),
          }),
        }),
      newPassword: z
        .string()
        .min(MIN_PASSWORD_LENGTH, {
          message: t('errors.passwordMinLength', {
            minLength: String(MIN_PASSWORD_LENGTH),
          }),
        })
        .max(MAX_PASSWORD_LENGTH, {
          message: t('errors.passwordMaxLength', {
            maxLength: String(MAX_PASSWORD_LENGTH),
          }),
        }),
      confirmPassword: z.string(),
    })
    .refine(
      ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
      {
        message: t('errors.passwordsNotMatch'),
        path: ['confirmPassword'],
      }
    );

export type ChangePasswordSchema = z.infer<
  ReturnType<typeof changePasswordSchema>
>;
