import { getDictionary } from "@/actions/lang.action";
import Folder from "@/components/entities/Folder/Folder";
import { FoldersApi } from "@/services/api/index.api";
import { Col } from "@w01f-o/react-grid-layout";
import { FC } from "react";
import styles from "./lastUpdatedFolders.module.scss";

const LastUpdatedFolders: FC = async () => {
  const { data: folders } = await FoldersApi.getLastUpdated();
  const dict = await getDictionary();

  return (
    <>
      {!!folders.length ? (
        folders.map((folder) => (
          <Col key={folder.id} xs={4}>
            <Folder dict={dict} folder={folder} extended={false} />
          </Col>
        ))
      ) : (
        <div className={styles.empty}>Пусто</div>
      )}
    </>
  );
};

export default LastUpdatedFolders;