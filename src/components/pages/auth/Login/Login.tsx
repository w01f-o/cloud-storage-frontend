import { FC } from "react";
import { Col, Row } from "@w01f-o/react-grid-layout";
import AuthForm from "@/components/features/Forms/AuthForm/AuthForm";
import styles from "../auth.module.scss";

const Login: FC = () => {
  return (
    <Row className={styles.row}>
      <Col xs={4}>
        <AuthForm type="signIn" />
      </Col>
    </Row>
  );
};

export default Login;
