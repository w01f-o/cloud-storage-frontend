"use client";

import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Container, Row } from "@w01f-o/react-grid-layout";
import styles from "../FolderListLoader/folderListLoader.module.scss";
import { useTheme } from "@/hooks/useTheme";

interface LastUpdatedFolderListLoaderProps {
  length: number;
}

const LastUpdatedFolderListLoader: FC<LastUpdatedFolderListLoaderProps> = ({
  length,
}) => {
  const theme = useTheme();

  return (
    <Container fluid>
      <Row className={styles.row}>
        {Array.from({ length }).map((_, index) => (
          <Col lg={4} md={6} xs={12} key={index}>
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

export default LastUpdatedFolderListLoader;
