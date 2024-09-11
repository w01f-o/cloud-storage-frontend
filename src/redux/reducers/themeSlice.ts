import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  theme: "light" | "dark";
}

const initialState: State = {
  theme: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<State["theme"]>) => {
      state.theme = action.payload;
    },
  },
});

export default themeSlice.reducer;

export const { setTheme } = themeSlice.actions;
