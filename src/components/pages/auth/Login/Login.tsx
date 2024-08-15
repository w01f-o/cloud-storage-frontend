import { FC } from "react";
import { Col, Row } from "@w01f-o/react-grid-layout";
import AuthForm from "@/components/features/Forms/AuthForm/AuthForm";
import styles from "../auth.module.scss";
import { auth } from "@/services/auth/auth";
import { redirect } from "next/navigation";

const Login: FC = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <Row className={styles.row}>
      <Col xs={4}>
        <AuthForm formType="login" />
      </Col>
    </Row>
  );
};

export default Login;
