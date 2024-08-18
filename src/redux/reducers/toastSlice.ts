import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Toast } from "@/types/toast.type";
import { nanoid } from "nanoid";

interface State {
  items: Toast[];
  isEnabled: boolean;
}

const initialState: State = {
  items: [],
  isEnabled: true,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<Toast, "id">>) => {
      if (state.isEnabled) {
        const { type, message } = action.payload;
        state.items.push({
          id: nanoid(),
          type,
          message,
        });
      }
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    enableToast: (state) => {
      state.isEnabled = true;
    },
    disableToast: (state) => {
      state.isEnabled = false;
    },
  },
});

export const { addToast, removeToast, enableToast, disableToast } =
  toastSlice.actions;

export default toastSlice.reducer;
