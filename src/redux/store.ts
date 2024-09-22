import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toastReducer from "./reducers/toastSlice";
import themeReducer from "./reducers/themeSlice";
import uploadedFilesReducer from "@/redux/reducers/uploadedFilesSlice";

const rootReducer = combineReducers({
  toast: toastReducer,
  theme: themeReducer,
  uploadedFiles: uploadedFilesReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
