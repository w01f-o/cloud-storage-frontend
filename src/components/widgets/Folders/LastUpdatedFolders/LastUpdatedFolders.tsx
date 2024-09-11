import Folder from "@/components/entities/Folder/Folder";
import { FoldersApi } from "@/services/api/index.api";
import { Col } from "@w01f-o/react-grid-layout";
import { FC } from "react";
import styles from "./lastUpdatedFolders.module.scss";
import { getDictionary } from "@/actions/lang.action";

const LastUpdatedFolders: FC = async () => {
  const { data: folders } = await FoldersApi.getLastUpdated();
  const dict = await getDictionary();

  return (
    <>
      {!!folders.length ? (
        folders.map((folder) => (
          <Col key={folder.id} lg={4} md={6} xs={12}>
            <Folder folder={folder} isExtended={false} />
          </Col>
        ))
      ) : (
        <div className={styles.empty}>{dict.folders.empty.title}</div>
      )}
    </>
  );
};

export default LastUpdatedFolders;
