"use client";

import { FC } from "react";
import styles from "./pageTitle.module.scss";
import { usePageName } from "@/hooks/usePageName";
import { useAppDispatch } from "@/hooks/redux";
import { addToast } from "@/redux/reducers/toastSlice";
import { nanoid } from "nanoid";

const PageTitle: FC = () => {
  const pageName = usePageName();
  const dispatch = useAppDispatch();
  return (
    <h1
      className={styles.title}
      style={{
        userSelect: "none",
      }}
      onClick={() => {
        dispatch(
          addToast({
            type: "info",
            message: nanoid(),
          }),
        );
      }}
    >
      {pageName}
    </h1>
  );
};

export default PageTitle;
