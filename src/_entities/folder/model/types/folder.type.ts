export interface Folder {
  id: string;
  name: string;
  color: string;
  size: bigint;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateFolderDto = Pick<Folder, 'name' | 'color'>;

export type UpdateFolderDto = Partial<CreateFolderDto>;
