"use client";

import { FC } from "react";
import { File as FileType } from "@/types/file.type";
import { getAccessTokenAction } from "@/actions/auth.actions";

interface FileProps {
  file: FileType;
}

const File: FC<FileProps> = ({ file }) => {
  const clickHandler = async () => {
    const tokenResult = await getAccessTokenAction();

    if (tokenResult.success) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/${file.id}`,
        {
          headers: {
            Authorization: `Bearer ${tokenResult.value}`,
          },
        },
      );
      const blob = await res.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = file.localName;
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    }
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
