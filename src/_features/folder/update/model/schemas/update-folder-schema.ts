import {
  MAX_FOLDER_NAME_LENGTH,
  MIN_FOLDER_NAME_LENGTH,
} from '@/_shared/model';
import { createTranslator, Messages } from 'next-intl';
import { z } from 'zod';

export const updateFolderSchema = (
  t: ReturnType<typeof createTranslator<Messages, 'FolderItem'>>
) =>
  z.object({
    name: z.string().min(MIN_FOLDER_NAME_LENGTH).max(MAX_FOLDER_NAME_LENGTH),
    color: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
  });

export type UpdateFolderSchema = z.infer<ReturnType<typeof updateFolderSchema>>;
