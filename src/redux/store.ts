import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toastReducer from "./reducers/toastSlice";
import themeReducer from "./reducers/themeSlice";

const rootReducer = combineReducers({
  toast: toastReducer,
  theme: themeReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
