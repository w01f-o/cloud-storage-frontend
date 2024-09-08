"use client";

import { FC, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Container, Row } from "@w01f-o/react-grid-layout";
import styles from "./folderListLoader.module.scss";
import { useTheme } from "@/hooks/useTheme";

interface FoldersListLoaderProps {
  view: "row" | "cells";
  length: number;
  width?: number;
}

const FolderListLoader: FC<FoldersListLoaderProps> = ({
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
    <Container fluid>
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
    </Container>
  );
};

export default FolderListLoader;
