import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Toast } from "@/types/toast.type";
import {
  addToast,
  disableToast,
  enableToast,
  removeToast,
} from "@/redux/reducers/toastSlice";

type ReturnType = {
  list: Toast[];
  add: (toast: Omit<Toast, "id">) => void;
  remove: (id: string) => void;
  disable: () => void;
  enable: () => void;
};

export const useToast = (): ReturnType => {
  const dispatch = useAppDispatch();

  const toastList = useAppSelector((state) => state.toast);

  const add = (toast: Omit<Toast, "id">): void => {
    dispatch(addToast(toast));
  };
  const remove = (id: string): void => {
    dispatch(removeToast(id));
  };

  const disable = (): void => {
    dispatch(disableToast());
  };
  const enable = (): void => {
    dispatch(enableToast());
  };

  return {
    list: toastList.items,
    add,
    remove,
    disable,
    enable,
  };
};
