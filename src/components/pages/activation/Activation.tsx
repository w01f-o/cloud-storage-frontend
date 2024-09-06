import { FC } from "react";
import ActivationForm from "@/components/features/Auth/ActivationForm/ActivationForm";
import { getDictionary } from "@/actions/lang.action";
import { Col, Row } from "@w01f-o/react-grid-layout";
import styles from "./activation.module.scss";
import { UserApi } from "@/services/api/index.api";
import { redirect } from "next/navigation";

const Activation: FC = async () => {
  const dict = await getDictionary();
  const { data: user } = await UserApi.getUser();

  if ("isActivated" in user && user.isActivated) {
    redirect("/");
  }

  return (
    <Row className={styles.row}>
      <Col xs={4}>
        <ActivationForm dict={dict} />
      </Col>
    </Row>
  );
};

export default Activation;
