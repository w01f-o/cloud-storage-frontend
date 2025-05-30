import {
  MAX_PASSWORD_LENGTH,
  MAX_USER_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USER_NAME_LENGTH,
} from '@/_shared/model';
import { createTranslator, Messages } from 'next-intl';
import { z } from 'zod';

export const registerFormSchema = (
  t: ReturnType<typeof createTranslator<Messages, 'AuthPage'>>
) =>
  z
    .object({
      email: z
        .string()
        .email({ message: t('errors.invalidEmail') })
        .min(1),
      name: z
        .string()
        .min(MIN_USER_NAME_LENGTH, {
          message: t('errors.nameMinLength', {
            minLength: MIN_USER_NAME_LENGTH,
          }),
        })
        .max(MAX_USER_NAME_LENGTH, {
          message: t('errors.nameMaxLength', {
            maxLength: MAX_USER_NAME_LENGTH,
          }),
        }),
      password: z
        .string()
        .min(MIN_PASSWORD_LENGTH, {
          message: t('errors.passwordMinLength', {
            minLength: MIN_PASSWORD_LENGTH,
          }),
        })
        .max(MAX_PASSWORD_LENGTH, {
          message: t('errors.passwordMaxLength', {
            maxLength: MAX_PASSWORD_LENGTH,
          }),
        }),
      confirmPassword: z.string(),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: t('errors.passwordsNotMatch'),
      path: ['confirmPassword'],
    });

export type RegisterFormSchema = z.infer<ReturnType<typeof registerFormSchema>>;
