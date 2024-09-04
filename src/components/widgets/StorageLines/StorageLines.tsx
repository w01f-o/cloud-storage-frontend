import { FC } from "react";
import { Storage } from "@/types/storage.type";
import styles from "./storageLines.module.scss";
import { RootDictionary } from "@/types/dictionaries.type";
import LineItem from "@/components/widgets/StorageLines/LineItem";

interface StorageLinesProps {
  storage: Storage;
  dict: RootDictionary;
}

const StorageLines: FC<StorageLinesProps> = ({ storage, dict }) => {
  return (
    <div className={styles.wrapper}>
      {storage.category.map((item) => (
        <LineItem
          key={item.type}
          dict={dict}
          category={item}
          space={storage.space}
        />
      ))}
    </div>
  );
};

export default StorageLines;
