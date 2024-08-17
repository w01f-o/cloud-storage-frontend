import { FC } from "react";
import { Col, Row } from "@w01f-o/react-grid-layout";
import styles from "../auth.module.scss";
import AuthForm from "@/components/features/Forms/AuthForm/AuthForm";
import { auth } from "@/services/auth/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getDictionary } from "@/dictionaries/dictionaries";

const Registration: FC = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  const cookie = cookies();
  const dict = await getDictionary(cookie.get("NEXT_LOCALE")?.value || "en-US");

  return (
    <Row className={styles.row}>
      <Col xs={4}>
        <AuthForm formType="registration" dict={dict} />
      </Col>
    </Row>
  );
};

export default Registration;
