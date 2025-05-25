import { MAX_FILE_NAME_LENGTH, MIN_FOLDER_NAME_LENGTH } from '@/_shared/model';
import { createTranslator, Messages } from 'next-intl';
import { z } from 'zod';

export const createFolderFormSchema = (
  t: ReturnType<typeof createTranslator<Messages, 'HomePage.CreateFormModal'>>
) =>
  z.object({
    name: z
      .string()
      .min(MIN_FOLDER_NAME_LENGTH, {
        message: t('errors.nameMinLength', {
          minLength: String(MIN_FOLDER_NAME_LENGTH),
        }),
      })
      .max(MAX_FILE_NAME_LENGTH, {
        message: t('errors.nameMaxLength', {
          maxLength: String(MAX_FILE_NAME_LENGTH),
        }),
      }),
    color: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
  });

export type CreateFolderSchema = z.infer<
  ReturnType<typeof createFolderFormSchema>
>;
