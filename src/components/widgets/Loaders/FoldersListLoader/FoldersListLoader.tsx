import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { Col, Row } from "@w01f-o/react-grid-layout";
import styles from "./foldersListLoader.module.scss";

interface FoldersListLoaderProps {
  view: "row" | "cells";
}

const FoldersListLoader: FC<FoldersListLoaderProps> = ({ view }) => {
  return (
    <Row className={styles.row}>
      {Array.from({ length: 15 }).map((_, index) => (
        <Col xs={view === "row" ? 12 : 2} key={index}>
          <Skeleton
            height={130}
            borderRadius={20}
            containerClassName={styles.container}
          ></Skeleton>
        </Col>
      ))}
    </Row>
  );
};

export default FoldersListLoader;
