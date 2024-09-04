import { FC } from "react";
import ActivateForm from "@/components/features/Auth/ActivateForm/ActivateForm";
import { getDictionary } from "@/actions/lang.action";
import { Col, Row } from "@w01f-o/react-grid-layout";
import styles from "./activation.module.scss";

const Activation: FC = async () => {
  const dict = await getDictionary();

  return (
    <Row className={styles.row}>
      <Col xs={3}>
        <ActivateForm dict={dict} />
      </Col>
    </Row>
  );
};

export default Activation;
