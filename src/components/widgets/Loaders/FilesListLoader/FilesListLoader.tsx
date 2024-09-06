import { FC } from "react";
import { Col } from "@w01f-o/react-grid-layout";
import styles from "@/components/widgets/Loaders/FoldersListLoader/foldersListLoader.module.scss";
import Skeleton from "react-loading-skeleton";

interface FilesListLoader {
  length: number;
  height?: number;
}

const FilesListLoader: FC<FilesListLoader> = ({ length, height }) => {
  return Array.from({ length }).map((_, index) => (
    <Col xs={12} key={index}>
      <Skeleton
        height={height ?? 60}
        borderRadius={20}
        containerClassName={styles.container}
      ></Skeleton>
    </Col>
  ));
};

export default FilesListLoader;
