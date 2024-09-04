import { FileTypes } from "@/enums/FileTypes.enum";

export interface File {
  id: string;
  name: string;
  localName: string;
  folderId: string;
  userId: string;
  addedAt: Date;
  size: number;
  type: FileTypes;
}
