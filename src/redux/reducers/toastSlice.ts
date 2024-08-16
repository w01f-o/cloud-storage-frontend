import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Toast } from "@/types/toast.type";
import { nanoid } from "nanoid";

interface State {
  items: Toast[];
}

const initialState: State = {
  items: [],
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<Toast, "id">>) => {
      const { type, message } = action.payload;
      state.items.push({
        id: nanoid(),
        type,
        message,
      });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
