import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface UploadingFile {
  id: string;
  name: string;
  progress: number;
  abortController?: AbortController;
}

interface UploadFileProgressesState {
  files: UploadingFile[];
}

interface UploadFileProgressesActions {
  addFile: (
    file: Omit<UploadingFile, 'progress'> &
      Partial<Pick<UploadingFile, 'progress'>>
  ) => void;
  removeFile: (id: string) => void;
  updateFileProgress: (id: string, progress: number) => void;
  setAbortController: (id: string, controller: AbortController) => void;
  abortUpload: (id: string) => void;
  abortAllUploads: () => void;
}

type UploadFileProgressesStore = UploadFileProgressesState &
  UploadFileProgressesActions;

const initialState: UploadFileProgressesState = {
  files: [],
};

export const useUploadFileProgresses = create<UploadFileProgressesStore>()(
  devtools(
    immer((set, get) => ({
      ...initialState,
      addFile: file => {
        set(state => {
          state.files.push({ progress: 0, ...file });
        });
      },
      removeFile: id => {
        set(state => {
          state.files = state.files.filter(file => file.id !== id);
        });
      },
      updateFileProgress: (id, progress) => {
        set(state => {
          const file = state.files.find(file => file.id === id);
          if (file) {
            file.progress = progress;
          }
        });
      },
      setAbortController: (id, controller) => {
        set(state => {
          const file = state.files.find(file => file.id === id);
          if (file) {
            file.abortController = controller;
          }
        });
      },
      abortUpload: id => {
        const file = get().files.find(file => file.id === id);
        file?.abortController?.abort();
      },
      abortAllUploads: () => {
        get().files.forEach(file => file.abortController?.abort());
        set({ files: [] });
      },
    })),
    { name: 'upload-file-progresses' }
  )
);
