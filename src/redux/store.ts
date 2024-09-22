import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import toastReducer from "./reducers/toastSlice";
import themeReducer from "./reducers/themeSlice";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  toast: toastReducer,
  theme: themeReducer,
});

// export const persistedReducer = persistReducer(
//   {
//     key: "root",
//     storage,
//     whitelist: ["theme"],
//   },
//   rootReducer,
// );

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
