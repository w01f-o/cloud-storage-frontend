import { MAX_FILE_NAME_LENGTH, MIN_FILE_NAME_LENGTH } from '@/_shared/model';
import { createTranslator, Messages } from 'next-intl';
import { z } from 'zod';

export const updateFileSchema = (
  t: ReturnType<typeof createTranslator<Messages, 'FileItem.modal.form.update'>>
) =>
  z.object({
    displayName: z
      .string()
      .min(
        MIN_FILE_NAME_LENGTH,
        t('errors.nameMinLength', { minLength: MIN_FILE_NAME_LENGTH })
      )
      .max(MAX_FILE_NAME_LENGTH, {
        message: t('errors.nameMaxLength', {
          maxLength: MAX_FILE_NAME_LENGTH,
        }),
      }),
  });

export type UpdateFileSchema = z.infer<ReturnType<typeof updateFileSchema>>;
