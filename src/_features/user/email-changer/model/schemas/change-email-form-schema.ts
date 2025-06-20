import { MAX_EMAIL_LENGTH, MIN_EMAIL_LENGTH } from '@/_shared/model';
import { createTranslator, Messages } from 'next-intl';
import { z } from 'zod';

export const changeEmailFormSchema = (
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
        message: t('errors.maxLength', { maxLength: MAX_EMAIL_LENGTH }),
      }),
  });

export type ChangeEmailFormSchema = z.infer<
  ReturnType<typeof changeEmailFormSchema>
>;
