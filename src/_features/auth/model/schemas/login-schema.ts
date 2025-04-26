import { createTranslator, Messages } from 'next-intl';
import { z } from 'zod';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../constants';

export const loginSchema = (
  t: ReturnType<typeof createTranslator<Messages, 'AuthPage'>>
) =>
  z.object({
    email: z
      .string()
      .email({ message: t('errors.invalidEmail') })
      .min(1),
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
  });

export type LoginFormSchema = z.infer<ReturnType<typeof loginSchema>>;
