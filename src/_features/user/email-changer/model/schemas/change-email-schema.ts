import { MAX_EMAIL_LENGTH, MIN_EMAIL_LENGTH } from '@/_shared/model';
import { createTranslator, Messages } from 'next-intl';
import { z } from 'zod';

export const changeEmailSchema = (
  t: ReturnType<typeof createTranslator<Messages, 'SettingsPage.account.email'>>
) =>
  z.object({
    email: z
      .string()
      .email({ message: t('errors.invalid') })
      .min(MIN_EMAIL_LENGTH, {
        message: t('errors.minLength', { minLength: MIN_EMAIL_LENGTH }),
      })
      .max(MAX_EMAIL_LENGTH, {
        message: t('errors.maxLength', { maxLength: 255 }),
      }),
  });

export type ChangeEmailSchema = z.infer<ReturnType<typeof changeEmailSchema>>;
