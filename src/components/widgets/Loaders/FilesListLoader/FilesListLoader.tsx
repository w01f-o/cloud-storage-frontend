import { FC } from "react";
import { Col } from "@w01f-o/react-grid-layout";
import styles from "@/components/widgets/Loaders/FoldersListLoader/foldersListLoader.module.scss";
import Skeleton from "react-loading-skeleton";

const FilesListLoader: FC = () => {
  return Array.from({ length: 15 }).map((_, index) => (
    <Col xs={2} key={index}>
      <Skeleton
        height={160}
        borderRadius={20}
        containerClassName={styles.container}
      ></Skeleton>
    </Col>
  ));
};

export default FilesListLoader;
