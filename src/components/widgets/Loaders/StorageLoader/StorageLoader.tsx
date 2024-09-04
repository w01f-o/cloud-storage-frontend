import { FC } from "react";
import styles from "./storageLoader.module.scss";

const StorageLoader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default StorageLoader;
