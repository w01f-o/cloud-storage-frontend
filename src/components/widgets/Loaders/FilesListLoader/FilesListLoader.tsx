"use client";

import { FC } from "react";
import { Col } from "@w01f-o/react-grid-layout";
import styles from "@/components/widgets/Loaders/FoldersListLoader/foldersListLoader.module.scss";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "@/hooks/useTheme";

interface FilesListLoader {
  length: number;
  height?: number;
}

const FilesListLoader: FC<FilesListLoader> = ({ length, height }) => {
  const theme = useTheme();

  return Array.from({ length }).map((_, index) => (
    <Col xs={12} key={index}>
      <Skeleton
        height={height ?? 60}
        borderRadius={20}
        containerClassName={styles.container}
        baseColor={
          theme.current === "dark" ? "var(--color-black_400)" : undefined
        }
        highlightColor={
          theme.current === "dark" ? "var(--color-hover)" : undefined
        }
      ></Skeleton>
    </Col>
  ));
};

export default FilesListLoader;
