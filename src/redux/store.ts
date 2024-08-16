import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toastReducer from "./reducers/toastSlice";

const rootReducer = combineReducers({
  toast: toastReducer,
});

export const makeStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
