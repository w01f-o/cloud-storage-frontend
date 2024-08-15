import { FC } from "react";
import { Col, Row } from "@w01f-o/react-grid-layout";
import styles from "../auth.module.scss";
import AuthForm from "@/components/features/Forms/AuthForm/AuthForm";
import { auth } from "@/services/auth/auth";
import { redirect } from "next/navigation";

const Registration: FC = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <Row className={styles.row}>
      <Col xs={4}>
        <AuthForm formType="registration" />
      </Col>
    </Row>
  );
};

export default Registration;
