"use client";

import { FC } from "react";
import styles from "./pageTitle.module.scss";
import { usePageName } from "@/hooks/usePageName";

const PageTitle: FC = () => {
  const pageName = usePageName();

  return <h1 className={styles.title}>{pageName}</h1>;
};

export default PageTitle;
