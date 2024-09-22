import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UploadedFile } from "@/types/uploadedFile";

interface State {
  files: UploadedFile[];
}

const initialState: State = {
  files: [],
};

export const uploadedFilesSlice = createSlice({
  name: "uploadedFiles",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Omit<UploadedFile, "progress">>) => {
      state.files.push({ ...action.payload, progress: 0 });
    },
    remove: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter((file) => file.id !== action.payload);
    },
    setProgress: (
      state,
      action: PayloadAction<{ id: string; progress: number }>,
    ) => {
      const { id, progress } = action.payload;
      const file = state.files.find((file) => file.id === id);
      if (file) {
        file.progress = progress;
      }
    },
  },
});

export const { remove, add, setProgress } = uploadedFilesSlice.actions;

export default uploadedFilesSlice.reducer;
