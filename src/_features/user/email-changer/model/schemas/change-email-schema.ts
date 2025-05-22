import { createTranslator, Messages } from 'next-intl';
import { z } from 'zod';

export const changeEmailSchema = (
  t: ReturnType<typeof createTranslator<Messages, 'AuthPage'>>
) =>
  z.object({
    email: z.string().email({ message: t('errors.invalidEmail') }),
  });

export type ChangeEmailSchema = z.infer<ReturnType<typeof changeEmailSchema>>;
