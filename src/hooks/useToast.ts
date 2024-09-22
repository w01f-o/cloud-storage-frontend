import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Toast } from "@/types/toast.type";
import {
  add as addAction,
  disable as disableAction,
  enable as enableAction,
  remove as removeAction,
} from "@/redux/reducers/toastSlice";

type useToastReturn = {
  list: Toast[];
  add: (toast: Omit<Toast, "id">) => void;
  remove: (id: string) => void;
  disable: () => void;
  enable: () => void;
};

export const useToast = (): useToastReturn => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.toast);

  const add = (toast: Omit<Toast, "id">): void => {
    dispatch(addAction(toast));
  };

  const remove = (id: string): void => {
    dispatch(removeAction(id));
  };

  const disable = (): void => {
    dispatch(disableAction());
  };

  const enable = (): void => {
    dispatch(enableAction());
  };

  return {
    list: items,
    add,
    remove,
    disable,
    enable,
  };
};
