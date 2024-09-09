"use client";

import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Container, Row } from "@w01f-o/react-grid-layout";
import styles from "./folderListLoader.module.scss";
import { useTheme } from "@/hooks/useTheme";

interface FoldersListLoaderProps {
  view: "row" | "cells";
  length: number;
}

const FolderListLoader: FC<FoldersListLoaderProps> = ({ view, length }) => {
  const theme = useTheme();

  return (
    <Container fluid>
      <Row className={styles.row}>
        {Array.from({ length }).map((_, index) => (
          <Col
            xxl={view === "row" ? 12 : 2}
            xl={view === "row" ? 12 : 3}
            lg={view === "row" ? 12 : 4}
            md={4}
            xs={12}
            key={index}
          >
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
