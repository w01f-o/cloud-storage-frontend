"use client";

import { FC } from "react";
import { File as FileType } from "@/types/file.type";
import { useRouter } from "next/navigation";

interface FileProps {
  file: FileType;
}

const File: FC<FileProps> = ({ file }) => {
  const router = useRouter();
  const clickHandler = async () => {
    router.push(`/api/file/${file.id}`);
  };

  return (
    <div
      onClick={clickHandler}
      style={{ fontSize: 30, marginBlock: 20, cursor: "pointer" }}
    >
      {file.localName}
    </div>
  );
};

export default File;
