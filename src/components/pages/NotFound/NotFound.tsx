import { FC } from "react";
import SadEmojiIcon from "@/components/shared/Icons/SadEmojiIcon";
import styles from "./notFound.module.scss";

const NotFound: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Страница не найдена</h1>
      <SadEmojiIcon width={250} height={250} />
    </div>
  );
};

export default NotFound;
