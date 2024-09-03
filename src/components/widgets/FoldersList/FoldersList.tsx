import { FC } from "react";
import Folder from "@/components/entities/Folder/Folder";
import styles from "./foldersList.module.scss";
import { Col, Row } from "@w01f-o/react-grid-layout";
import { FoldersApi } from "@/services/api/index.api";
import { QueryParams } from "@/types/queryParams.type";
import FolderCreator from "@/components/features/Folders/FolderCreator/FolderCreator";
import { RootDictionary } from "@/types/dictionaries.type";

interface FoldersListProps {
  params: QueryParams & {
    view: "row" | "cells";
  };
  dict: RootDictionary;
}

const FoldersList: FC<FoldersListProps> = async ({ params, dict }) => {
  const { data: folders } = await FoldersApi.getAll(params);

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
        <Row className={styles.row}>
          {folders.map((folder) => (
            <Col key={folder.id} xs={params.view === "row" ? 12 : 2}>
              <Folder folder={folder} dict={dict} extended />
            </Col>
          ))}
          <Col xs={12}>
            <FolderCreator dict={dict} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default FoldersList;
