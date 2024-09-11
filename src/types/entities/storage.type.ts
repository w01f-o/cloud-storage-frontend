import { FileTypes } from "@/enums/FileTypes.enum";

export interface Category {
  type: FileTypes;
  size: number;
}

export interface Space {
  used: number;
  free: number;
  total: number;
}

export interface Storage {
  category: Category[];
  space: Space;
}
