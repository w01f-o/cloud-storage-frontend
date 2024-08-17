import { FC } from "react";
import { Col, Row } from "@w01f-o/react-grid-layout";
import AuthForm from "@/components/features/Forms/AuthForm/AuthForm";
import styles from "../auth.module.scss";
import { auth } from "@/services/auth/auth";
import { redirect } from "next/navigation";
import { getDictionary } from "@/actions/lang.action";

const Login: FC = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  const dict = await getDictionary();

  return (
    <Row className={styles.row}>
      <Col xs={4}>
        <AuthForm formType="login" dict={dict} />
      </Col>
    </Row>
  );
};

export default Login;
