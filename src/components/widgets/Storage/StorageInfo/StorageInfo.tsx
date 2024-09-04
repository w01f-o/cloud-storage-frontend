import { FC } from "react";
import { getDictionary } from "@/actions/lang.action";
import { UserApi } from "@/services/api/index.api";
import { Col, Row } from "@w01f-o/react-grid-layout";
import styles from "@/components/pages/storage/storage.module.scss";
import StorageDoughnut from "@/components/widgets/Storage/StorageDoughnut/StorageDoughnut";
import { Utils } from "@/services/utils";
import StorageLines from "@/components/widgets/Storage/StorageLines/StorageLines";

const StorageInfo: FC = async () => {
  const dict = await getDictionary();
  const { data } = await UserApi.getUserStorage();

  return (
    <Row className={styles.row}>
      <Col xs={5} className={styles.leftCol}>
        <StorageDoughnut storage={data} />
        <div className={styles.free}>
          {dict.storage.space.free}: <br />
          {Utils.formatBytes(data.space.free, dict)}
        </div>
        <div className={styles.total}>
          {dict.storage.space.total} -{" "}
          {Utils.formatBytes(data.space.total, dict)}
        </div>
        <div className={styles.used}>
          {dict.storage.space.used} - {Utils.formatBytes(data.space.used, dict)}
        </div>
      </Col>
      <Col xs={7}>
        <StorageLines storage={data} dict={dict} />
      </Col>
    </Row>
  );
};

export default StorageInfo;
