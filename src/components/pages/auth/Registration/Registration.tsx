import { FC } from "react";
import { Col, Row } from "@w01f-o/react-grid-layout";
import styles from "../auth.module.scss";
import AuthForm from "@/components/features/Forms/AuthForm/AuthForm";

const Registration: FC = () => {
  return (
    <Row className={styles.row}>
      <Col xs={4}>
        <AuthForm formType="register" />
      </Col>
    </Row>
  );
};

export default Registration;
