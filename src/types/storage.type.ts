import { File } from "@/types/file.type";

export interface Storage {
  usedSpace: bigint;
  freeSpace: bigint;
  files: Pick<File, "type" | "size">[];
}
