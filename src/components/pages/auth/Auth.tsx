import { FC } from "react";
import { auth } from "@/services/auth/auth";
import { redirect } from "next/navigation";
import { getDictionary } from "@/actions/lang.action";
import { Col, Row } from "@w01f-o/react-grid-layout";
import styles from "@/components/pages/auth/auth.module.scss";
import AuthForm from "@/components/features/Auth/AuthForm/AuthForm";

interface AuthProps {
  type: "login" | "registration";
}

const Auth: FC<AuthProps> = async ({ type }) => {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  const dict = await getDictionary();

  return (
    <Row className={styles.row}>
      <Col xs={4}>
        <AuthForm formType={type} dict={dict} />
      </Col>
    </Row>
  );
};

export default Auth;
