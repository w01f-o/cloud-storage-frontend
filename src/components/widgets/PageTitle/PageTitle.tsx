import { FC, ReactNode } from "react";
import styles from "./pageTitle.module.scss";

interface PageTitleProps {
  children: ReactNode;
}

const PageTitle: FC<PageTitleProps> = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export default PageTitle;
