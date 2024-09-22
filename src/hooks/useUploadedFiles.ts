import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  add as addAction,
  remove as removeAction,
  setProgress as setProgressAction,
} from "@/redux/reducers/uploadedFilesSlice";
import { UploadedFile } from "@/types/uploadedFile";

type useUploadedFilesReturn = {
  files: UploadedFile[];
  add: (file: Omit<UploadedFile, "progress">) => void;
  remove: (id: string) => void;
  setProgress: ({ id, progress }: { id: string; progress: number }) => void;
};

export const useUploadedFiles = (): useUploadedFilesReturn => {
  const dispatch = useAppDispatch();
  const { files } = useAppSelector((state) => state.uploadedFiles);

  const add = (file: Omit<UploadedFile, "progress">): void => {
    dispatch(addAction(file));
  };

  const remove = (id: string): void => {
    dispatch(removeAction(id));
  };

  const setProgress = ({ id, progress }: { id: string; progress: number }) => {
    dispatch(
      setProgressAction({
        id,
        progress,
      }),
    );
  };

  return {
    files,
    add,
    remove,
    setProgress,
  };
};
