import { createTranslator, Messages } from 'next-intl';
import { z } from 'zod';
import {
  MAX_PASSWORD_LENGTH,
  MAX_USER_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USER_NAME_LENGTH,
} from './constants';

export const registerSchema = (
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
            minLength: String(MIN_USER_NAME_LENGTH),
          }),
        })
        .max(MAX_USER_NAME_LENGTH, {
          message: t('errors.nameMaxLength', {
            maxLength: String(MAX_USER_NAME_LENGTH),
          }),
        }),
      password: z
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
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: t('errors.passwordsNotMatch'),
      path: ['confirmPassword'],
    });

export type RegisterFormSchema = z.infer<ReturnType<typeof registerSchema>>;
