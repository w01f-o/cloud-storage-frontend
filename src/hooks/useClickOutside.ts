import { RefObject, useEffect } from "react";

interface useClickOutsideOptions {
  ref: RefObject<HTMLElement>;
  callback: () => void;
}

export const useClickOutside = ({
  ref,
  callback,
}: useClickOutsideOptions): void => {
  useEffect(() => {
    const clickHandler = (e: any): void => {
      if (!ref.current?.contains(e.target)) {
        callback();
      }
    };

    document.body.addEventListener("click", clickHandler);
    document.body.addEventListener("contextmenu", clickHandler);

    return () => {
      document.body.removeEventListener("click", clickHandler);
      document.body.removeEventListener("contextmenu", clickHandler);
    };
  }, [callback, ref]);
};
