"use client";

import { FC } from "react";
import { Category, Space } from "@/types/storage.type";
import { Utils } from "@/services/utils";
import styles from "./storageLines.module.scss";
import { RootDictionary } from "@/types/dictionaries.type";
import { useSpring, animated } from "@react-spring/web";

interface LineItemProps {
  category: Category;
  space: Space;
  dict: RootDictionary;
}

const LineItem: FC<LineItemProps> = ({ category, dict, space }) => {
  const width = (category.size / space.used) * 100;
  const widthStyles = useSpring({
    from: { width: "0%" },
    to: { width: `${width}%` },
    config: { mass: 2, tension: 120, friction: 40 },
  });

  return (
    <div className={styles.item}>
      <i
        className={styles.dot}
        style={{ background: Utils.getFileStyles(category.type, 1).color }}
      ></i>
      <div className={styles.info}>
        <div className={styles.type}>
          {
            dict.storage.fileTypes[
              category.type as keyof typeof dict.storage.fileTypes
            ]
          }
        </div>
        <div className={styles.size}>
          {Utils.formatBytes(category.size, dict)}
        </div>
      </div>
      <div className={styles.line}>
        <animated.div
          className={styles.progress}
          style={{
            background: Utils.getFileStyles(category.type, 1).color,
            ...widthStyles,
          }}
        ></animated.div>
      </div>
    </div>
  );
};

export default animated(LineItem);
