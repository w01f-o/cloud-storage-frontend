import { FC } from "react";
import { Col, Row } from "@w01f-o/react-grid-layout";
import styles from "@/components/widgets/Loaders/FoldersListLoader/foldersListLoader.module.scss";
import Skeleton from "react-loading-skeleton";

interface FilesListLoader {
  length: number;
  height?: number;
}

const FilesListLoader: FC<FilesListLoader> = ({ length, height }) => {
  return Array.from({ length }).map((_, index) => (
    <Row key={index}>
      <Col xs={12}>
        <Skeleton
          height={height ?? 60}
          borderRadius={20}
          containerClassName={styles.container}
        ></Skeleton>
      </Col>
    </Row>
  ));
};

export default FilesListLoader;
