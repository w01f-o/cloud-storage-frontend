import { FC } from "react";
import styles from "./help.module.scss";
import { Col } from "@w01f-o/react-grid-layout";
import PageTitle from "@/components/widgets/PageTitle/PageTitle";
import Accordion from "@/components/shared/UI/Accordion/Accordion";
import { cookies } from "next/headers";
import { getDictionary } from "@/dictionaries/dictionaries";

const Help: FC = async () => {
  const cookie = cookies();
  const dict = await getDictionary(cookie.get("NEXT_LOCALE")?.value as string);

  return (
    <>
      <PageTitle>{dict.pages.help}</PageTitle>
      <Col className={styles.faq} xs={8}>
        <Accordion data={dict.help.accordion} />
      </Col>
    </>
  );
};

export default Help;
