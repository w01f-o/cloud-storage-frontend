import { FC } from "react";
import Folder from "@/components/entities/Folder/Folder";
import styles from "./folderList.module.scss";
import { Col, Container, Row } from "@w01f-o/react-grid-layout";
import { FoldersApi } from "@/services/api/index.api";
import { QueryParams } from "@/types/queryParams.type";
import FolderCreator from "@/components/features/Folders/FolderCreator/FolderCreator";
import clsx from "clsx";
import { getDictionary } from "@/actions/lang.action";

interface FolderListProps {
  params: QueryParams & {
    view: "row" | "cells";
  };
}

const FolderList: FC<FolderListProps> = async ({ params }) => {
  const { data: folders } = await FoldersApi.getAll(params);
  const dict = await getDictionary();

  return (
    <>
      {params.search && !folders.length && (
        <div className={styles.notFound}>{dict.folders.notFound}</div>
      )}
      {!params.search && !folders.length && (
        <div className={styles.emptyRow}>
          <h4 className={styles.empty}>
            <strong>{dict.folders.empty.title}</strong> <br />
            {dict.folders.empty.description}
          </h4>
          <FolderCreator dict={dict} />
        </div>
      )}
      {!!folders.length && (
        <Container fluid>
          <Row className={clsx(styles.row)}>
            {folders.map((folder) => (
              <Col
                key={folder.id}
                xxl={params.view === "row" ? 12 : 2}
                xl={params.view === "row" ? 12 : 3}
                lg={params.view === "row" ? 12 : 4}
                md={4}
                xs={6}
              >
                <Folder folder={folder} isExtended />
              </Col>
            ))}
            <Col xs={12}>
              <FolderCreator dict={dict} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default FolderList;
