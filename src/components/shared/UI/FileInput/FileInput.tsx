"use client";

import {
  DragEvent,
  FC,
  forwardRef,
  InputHTMLAttributes,
  MutableRefObject,
  useEffect,
  useRef,
} from "react";
import styles from "./fileInput.module.scss";
import { Upload } from "lucide-react";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  setValue: (...args: any) => void;
}

const FileInput: FC<FileInputProps> = forwardRef<
  HTMLInputElement,
  FileInputProps
>(({ setValue, ...props }, ref) => {
  const uploaderRef = useRef<HTMLDivElement | null>(null);
  const localRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (typeof ref === "function") {
      ref(localRef.current);
    } else if (ref) {
      (ref as MutableRefObject<HTMLInputElement | null>).current =
        localRef.current;
    }
  }, [ref]);

  const uploaderClickHandler = () => {
    if (localRef.current) {
      localRef.current?.click();
    }
  };

  const dragHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    switch (e.type) {
      case "dragenter":
        break;
      case "dragleave":
        break;
      case "dragover":
        break;
      case "dragend":
        break;
      case "drop":
        const file = e.dataTransfer.files;
        setValue("name", file[0].name);
        setValue("file", file);
        break;
    }
  };

  return (
    <>
      <label className={styles.label}>
        <input type="file" ref={localRef} {...props} />
      </label>
      <div
        ref={uploaderRef}
        onClick={uploaderClickHandler}
        onDragOver={dragHandler}
        onDragLeave={dragHandler}
        onDrag={dragHandler}
        onDragEnter={dragHandler}
        onDragEnd={dragHandler}
        onDrop={dragHandler}
        className={styles.uploader}
      >
        <Upload width={40} height={40} />
      </div>
    </>
  );
});

FileInput.displayName = "FileField";

export default FileInput;
