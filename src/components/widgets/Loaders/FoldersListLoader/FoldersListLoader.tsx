"use client";

import { FC, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Row } from "@w01f-o/react-grid-layout";
import styles from "./foldersListLoader.module.scss";
import { useTheme } from "@/hooks/useTheme";

interface FoldersListLoaderProps {
  view: "row" | "cells";
  length: number;
  width?: number;
}

const FoldersListLoader: FC<FoldersListLoaderProps> = ({
  view,
  length,
  width,
}) => {
  const theme = useTheme();
  const xs = useMemo(() => {
    if (width) return width;

    switch (view) {
      case "row":
        return 12;
      case "cells":
        return 2;
      default:
        return 2;
    }
  }, [view, width]);

  return (
    <Row className={styles.row}>
      {Array.from({ length }).map((_, index) => (
        <Col xs={xs} key={index}>
          <Skeleton
            height={130}
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
      ))}
    </Row>
  );
};

export default FoldersListLoader;
