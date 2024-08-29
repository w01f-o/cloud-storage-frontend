import { getDictionary } from "@/actions/lang.action";
import Folder from "@/components/entities/Folder/Folder";
import { FoldersApi } from "@/services/api/index.api";
import { Col } from "@w01f-o/react-grid-layout";
import { FC } from "react";

const MyFolders: FC = async () => {
  const { data: folders } = await FoldersApi.getAll();
  const dict = await getDictionary();
  console.log(folders);

  return folders.map((folder) => (
    <Col key={folder.id} xs={4}>
      <Folder dict={dict} folder={folder} />
    </Col>
  ));
};

export default MyFolders;
