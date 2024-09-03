import { FC } from "react";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import { getDictionary } from "@/actions/lang.action";
import { UserApi } from "@/services/api/index.api";
import DoughnutStorage from "@/components/widgets/DoughnutStorage/DoughnutStorage";
import { Col, Row } from "@w01f-o/react-grid-layout";

const Storage: FC = async () => {
  const dict = await getDictionary();
  const { data } = await UserApi.getStorage();

  return (
    <>
      <PageTitle>{dict.pages.storage}</PageTitle>
      <Row>
        <Col xs={4}>
          <DoughnutStorage storage={data} />
        </Col>
      </Row>
    </>
  );
};

export default Storage;
