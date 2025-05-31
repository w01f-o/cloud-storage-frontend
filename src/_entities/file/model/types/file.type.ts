import { ResolvedFileTypes } from '../enums/resolved-file-types.enum';

export interface File {
  id: string;
  name: string;
  displayName: string;
  originalName: string;
  mimeType: string;
  resolvedType: ResolvedFileTypes;
  size: bigint;
  isShared: boolean;
  folderId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateFileDto = Partial<Pick<File, 'displayName'>>;
