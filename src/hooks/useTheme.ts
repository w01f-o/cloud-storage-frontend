import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setTheme } from "@/redux/reducers/themeSlice";

type useThemeReturn = {
  toggle: () => void;
  set: (theme: "light" | "dark") => void;
  current: "light" | "dark";
};

export const useTheme = (): useThemeReturn => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);

  const toggle = () => dispatch(setTheme(theme === "light" ? "dark" : "light"));
  const set = (theme: "light" | "dark") => dispatch(setTheme(theme));

  return {
    toggle,
    set,
    current: theme,
  };
};
