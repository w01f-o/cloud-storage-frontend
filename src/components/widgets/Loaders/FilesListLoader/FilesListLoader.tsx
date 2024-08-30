import { FC } from "react";
import { Col, Row } from "@w01f-o/react-grid-layout";
import styles from "@/components/widgets/Loaders/FoldersListLoader/foldersListLoader.module.scss";
import Skeleton from "react-loading-skeleton";

const FilesListLoader: FC = () => {
  return (
    <Row className={styles.row}>
      {Array.from({ length: 15 }).map((_, index) => (
        <Col xs={3} key={index}>
          <Skeleton
            height={150}
            borderRadius={20}
            containerClassName={styles.container}
          ></Skeleton>
        </Col>
      ))}
    </Row>
  );
};

export default FilesListLoader;
